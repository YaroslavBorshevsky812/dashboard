import { FC, useEffect } from 'react';
import Card from '../Card';
import './workoutListCard.scss';
import ListItem from '../../ListItem/ListItem';
import Scrollbar from '../../Scrollbar/Scrollbar';
import { ReactComponent as Calendar } from '../../../assets/icons/calendar.svg';
import { ReactComponent as Plus } from '../../../assets/icons/plus-circle.svg';
import { navigationService } from '../../../services/NavigationService';
import { ECardType, EItemListType } from '../../../utils/enums/Enums';
import { storeWorkoutService, workoutService } from '../../../services/WorkoutService';
import { useObservable } from '../../../utils/useObservable';
import moment from 'moment/moment';
import { closeDialog, openDialog } from '../../Dialogs/DialogLayer';

interface Props {
    /** Клик по кнопке создания новой тренировки. */
    onCreateNewWokroutBtnClick?: () => void;
}

const WorkoutListCard: FC<Props> = (props) => {
    const { onCreateNewWokroutBtnClick } = props;

    /** Список тренировок. */
    const workoutList = useObservable(storeWorkoutService.workoutList);

    useEffect(() => {
        workoutService.requestWorkoutListFromServer();
    }, []);

    const handleDeleteBtnClick = (workoutId: number): void => {
        openDialog(() => renderConfirmDeleteDialog(workoutId));
    };

    const handleDoneDeleteDialogBtnClick = (workoutId: number): void => {
        workoutService.deleteWorkoutFromServer(workoutId).then(() => {
            workoutService.requestWorkoutListFromServer();
            navigationService.setCurrentWorkoutCard(null);
            closeDialog();
        });
    };

    const handleExerciseItemClick = (currentWorkoutId: number): void => {
        workoutService.requestWorkoutFromServer(currentWorkoutId).then((res) => {
            workoutService.setCurrentWorkout(res.data);
            workoutService.setCurrentExerciseList(res.data.items);

            navigationService.setCurrentWorkoutCard(ECardType.EXERCISE_LIST);
            workoutService.setCurrentWorkoutId(currentWorkoutId);
        });
    };

    const handleExitDialogBtnClick = () => {
        closeDialog();
    };

    const renderSideBar = (): JSX.Element => {
        return (
            <div className="card__sidebar">
                <Calendar className="card__sidebar__item calendar" />
                <Plus onClick={onCreateNewWokroutBtnClick} className="card__sidebar__item plus" />
            </div>
        );
    };

    const renderConfirmDeleteDialog = (workoutId: number) => {
        return (
            <div className="dialog__wrapper">
                <Card onExitClick={handleExitDialogBtnClick} className="dialog">
                    <div className="dialog__content">
                        <span>Действительно хотите удалить?</span>
                    </div>
                    <div className="dialog__btns">
                        <button onClick={() => handleDoneDeleteDialogBtnClick(workoutId)} className="dialog__btn-item">
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

    const renderWorkoutList = () => {
        return workoutList.map((item, index) => (
            <ListItem
                key={index}
                itemType={EItemListType.SIMPLE}
                isBtnNeeded
                leftTitle={moment(item.date).format('DD.MM.YYYY')}
                rightTitle={item.title}
                onItemClick={() => handleExerciseItemClick(item.id)}
                onDeleteBtn={() => handleDeleteBtnClick(item.id)}
            />
        ));
    };

    return (
        <div className="workout-list-card__wrapper">
            <Card sideBar={renderSideBar()} isSideBar titleRight="Тренировки" className="workout-list-card">
                <ul className="workout-list">
                    <Scrollbar>{renderWorkoutList()}</Scrollbar>
                </ul>
            </Card>
        </div>
    );
};

export default WorkoutListCard;
