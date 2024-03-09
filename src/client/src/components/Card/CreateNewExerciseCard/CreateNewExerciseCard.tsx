import { Input } from 'antd';
import { ECardType } from '../../../utils/enums/Enums';
import Card from '../Card';
import { ReactComponent as RightArrow } from '../../../assets/icons/next.svg';
import { navigationService } from '../../../services/NavigationService';
import { useState } from 'react';
import { storeWorkoutService, workoutService } from '../../../services/WorkoutService';
import { useObservable } from '../../../utils/useObservable';
import { closeDialog, openDialog } from '../../Dialogs/DialogLayer';
import { storeWorkoutStatisticService } from '../../../services/WorkoutStatisticService';
import ListItem from '../../ListItem/ListItem';

const CreateNewExerciseCard = () => {
    /** Текущая тренировка. */
    const currentWorkout = useObservable(storeWorkoutService.currentWorkout);
    /** Список названий тренировок. */
    const exerciseTitlesList = useObservable(storeWorkoutStatisticService.exerciseTitlesList);

    /** Название нового упражнения. */
    const [newExerciseTitle, setNewExerciseTitle] = useState<string>('');

    const handleMoveToRepetitionsList = (): void => {
        if (newExerciseTitle !== '') {
            workoutService
                .createNewExercise({ training_day_id: currentWorkout?.id, workout_name: newExerciseTitle })
                .then((response) => {
                    workoutService.setCurrentExercise(response.data);
                    currentWorkout &&
                        workoutService.requestWorkoutFromServer(currentWorkout.id).then((res) => {
                            workoutService.setCurrentExerciseList(res.data.items);
                            navigationService.setCurrentWorkoutCard(ECardType.EXERCISE_LIST);
                        });
                });
        }
    };

    const handleOpenSelectModal = () => {
        openDialog(renderSelectTitleModalWindow);
    };

    const handleChangeTitle = (e: any) => {
        setNewExerciseTitle(e.target.value);
    };

    const handleExitBtnClick = (): void => {
        navigationService.setCurrentWorkoutCard(null);
    };

    const handleExitDialogBtnClick = () => {
        closeDialog();
    };

    const handleChooseTitleBtnClick = (exerciseTitle: string) => {
        setNewExerciseTitle(exerciseTitle);
        closeDialog();
    };
    

    const renderSelectTitleModalWindow = () => {
        return (
            <div className="dialog__wrapper">
                <Card onExitClick={handleExitDialogBtnClick} className="dialog">
                    <div className="exercise-titles">
                        {exerciseTitlesList.length &&
                            exerciseTitlesList.map((title, index) => (
                                <ListItem
                                    onItemClick={() => handleChooseTitleBtnClick(title)}
                                    key={index}
                                    leftTitle={title}
                                />
                            ))}
                    </div>
                </Card>
            </div>
        );
    };

    return (
        <Card
            onExitClick={handleExitBtnClick}
            key={ECardType.CREATE_NEW_EXERCISE}
            className="workout-item-card"
            titleRight="Зал"
            titleLeft="02.10.23"
        >
            <div className="workout-item-card__content">
                <div className="workout-item-card__step-one">
                    <Input value={newExerciseTitle ?? null} onChange={handleChangeTitle} placeholder="Введите название упражнения" />
                    <button onClick={handleMoveToRepetitionsList}>
                        <RightArrow className="right-arrow" />
                    </button>
                    <button className="select-btn" onClick={handleOpenSelectModal}>
                        Выберете из существующих
                    </button>
                </div>
            </div>
        </Card>
    );
};

export default CreateNewExerciseCard;
