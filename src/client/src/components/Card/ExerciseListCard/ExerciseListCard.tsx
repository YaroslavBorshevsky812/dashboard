import { ECardType, EItemListType } from '../../../utils/enums/Enums';
import ListItem from '../../ListItem/ListItem';
import Scrollbar from '../../Scrollbar/Scrollbar';
import Card from '../Card';
import { ReactComponent as Plus } from '../../../assets/icons/plus-circle.svg';
import { useObservable } from '../../../utils/useObservable';
import { storeWorkoutService, workoutService } from '../../../services/WorkoutService';
import { ExerciseModel } from '../../../Models/ExerciseModel';
import { navigationService } from '../../../services/NavigationService';
import moment from 'moment/moment';
import { closeDialog, openDialog } from '../../Dialogs/DialogLayer';

const ExerciseListCard = () => {
    /** Список упражнений. */
    const exerciseList = useObservable(storeWorkoutService.currentExerciseList);
    /** Текущая тренировка. */
    const currentWorkout = useObservable(storeWorkoutService.currentWorkout);

    const handleNavigateToNewExerciseCreation = (): void => {
        navigationService.setCurrentWorkoutCard(ECardType.CHOOSE_EXERCISE_TYPE);
    };

    const handleExitBtnClick = (): void => {
        navigationService.setCurrentWorkoutCard(null);
    }

    const handleExerciseClick = (exercise: ExerciseModel): void => {
        workoutService.setCurrentExercise(exercise);
        workoutService.setCurrentRepetitionList(exercise.repetitions);
        navigationService.setCurrentWorkoutCard(ECardType.REPETITIONS_LIST);
    };

    const handleExitDialogBtnClick = () => {
        closeDialog();
    };

    const handleDeleteBtnClick = (exerciseId: number): void => {
        openDialog(() => renderConfirmDeleteDialog(exerciseId));
    };

    const handleDoneDeleteDialogBtnClick = (exerciseId: number): void => {
        workoutService.deleteExerciseFromServer(exerciseId).then(() => {
            currentWorkout && workoutService.requestWorkoutFromServer(currentWorkout?.id).then((res) => {
                workoutService.setCurrentExerciseList(res.data.items)
            })
            closeDialog();
        });
    };

    /** Рендер списка упражнений. */
    const renderExericseList = () => {
        if (!exerciseList) {
            return;
        }
        return exerciseList.map((item: ExerciseModel, index) => (
            <ListItem
                key={index}
                itemType={EItemListType.SIMPLE}
                isBtnNeeded
                leftTitle={`${index + 1}. ${item.workout_name}`}
                onItemClick={() => handleExerciseClick(item)}
                onDeleteBtn={() => handleDeleteBtnClick(item.id)}
            />
        ));
    };

    const renderConfirmDeleteDialog = (exerciseId: number) => {
        return (
            <div className="dialog__wrapper">
                <Card onExitClick={handleExitDialogBtnClick} className="dialog">
                    <div className="dialog__content">
                        <span>Действительно хотите удалить?</span>
                    </div>
                    <div className="dialog__btns">
                        <button onClick={() => handleDoneDeleteDialogBtnClick(exerciseId)} className="dialog__btn-item">
                            Да
                        </button>
                        <button onClick={handleExitDialogBtnClick} className="dialog__btn-item">
                            Отмена
                        </button>
                    </div>
                </Card>
            </div>
        );
    };

    return (
        currentWorkout && (
            <Card
                key={ECardType.EXERCISE_LIST}
                className="workout-item-card"
                titleRight={currentWorkout.title}
                titleLeft={moment(currentWorkout.date).format('DD.MM.YYYY')}
                onExitClick={handleExitBtnClick}
            >
                <div className="workout-item-card__content">
                    <ul className="workout-item-card__left-side">
                        {exerciseList?.length ? (
                            <Scrollbar>{renderExericseList()}</Scrollbar>
                        ) : (
                            <span>Тут пока ничего нет</span>
                        )}
                    </ul>
                    <div className="workout-item-card__right-side">
                        <Plus
                            onClick={handleNavigateToNewExerciseCreation}
                            className="workout-item-card__right-side__btn"
                        />
                    </div>
                </div>
            </Card>
        )
    );
};

export default ExerciseListCard;
