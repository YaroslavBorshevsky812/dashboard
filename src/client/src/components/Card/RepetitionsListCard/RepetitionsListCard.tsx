import { ECardType } from '../../../utils/enums/Enums';
import Scrollbar from '../../Scrollbar/Scrollbar';
import Card from '../Card';
import { ReactComponent as Plus } from '../../../assets/icons/plus-circle.svg';
import { ReactComponent as Garbage } from '../../../assets/icons/garbage.svg';
import { useState } from 'react';
import { storeWorkoutService, workoutService } from '../../../services/WorkoutService';
import { useObservable } from '../../../utils/useObservable';
import { RepetitionModel } from '../../../Models/RepetitionModel';
import moment from 'moment/moment';
import { ExerciseModel } from '../../../Models/ExerciseModel';
import { ReactComponent as RightArrow } from '../../../assets/icons/next.svg';
import { RepetitionCreationModel } from '../../../Models/RepetitionCreationModel';
import InputNumber from '../../InputNumber/InputNumber';
import { navigationService } from '../../../services/NavigationService';
import RepetitionItem from '../../ListItem/RepetitionItem/RepetitionItem';

const RepetitionsListCard = () => {
    /** Показывать ли панель создания нового подхода. */
    const [isCreatorShown, setIsCreatorShown] = useState(false);
    /** Вес в создаваемом подходе. */
    const [newRepWeight, setNewRepWeight] = useState<number | null>(null);
    /** Количество подходов в создаваемом подходе. */
    const [newAmountOfReps, setNewAmountOfReps] = useState<number | null>(null);

    /** Текущая тренировка. */
    const currentWorkout = useObservable(storeWorkoutService.currentWorkout);
    /** Текущий список подходов конкретного упражнения. */
    const currentRepetitionList = useObservable<RepetitionModel[] | null>(storeWorkoutService.currentRepetitionList);
    /** Текущее упражнение. */
    const currentExercise = useObservable<ExerciseModel | null>(storeWorkoutService.currentExercise);

    /** Обработчик нажатия на кнопку открытия панели создания нового подхода. */
    const handleCreateNewRepetitionClick = (): void => {
        setIsCreatorShown(!isCreatorShown);
    };

    const handleEditDoneBtnClick = () => {
        const newRepetitionItem: RepetitionCreationModel = {
            workout_item_id: currentExercise?.id,
            number_of_set: currentRepetitionList?.length ? (currentRepetitionList?.length + 1).toString() : '1',
            weight: newRepWeight,
            repetitions_number: newAmountOfReps,
        };

        workoutService.createNewRepetiton(newRepetitionItem).then(() => {
            currentExercise &&
                workoutService.requestRepetitionListFromServer(currentExercise.id).then((response) => {
                    workoutService.setCurrentRepetitionList(response.data.repetitions);

                    setNewRepWeight(null);
                    setNewAmountOfReps(null);
                });
        });
    };

    /** Обработчик инпута веса. */
    const handleWeightChange = (value: number | null): void => {
        setNewRepWeight(value);
    };

    /** Обработчик инпута количества повторений. */
    const handleAmountOfRepsChange = (value: number | null): void => {
        setNewAmountOfReps(value);
    };

    const handleExitBtnClick = (): void => {
        navigationService.setCurrentWorkoutCard(null);
    };

    const handleRepEditDoneBtnClick = (obj: RepetitionModel): void => {
        workoutService.updateRepetitionItem(obj).then(() => {
            currentExercise &&
                workoutService.requestRepetitionListFromServer(currentExercise.id).then((response) => {
                    workoutService.setCurrentRepetitionList(response.data.repetitions);
                });
        });
    };

    /** Рендер сайдбара карточки списка подходов. */
    const renderSideBar = (): JSX.Element => {
        return (
            <div className="card__sidebar">
                <Garbage className="card__sidebar__item garbage" />
                <Plus onClick={handleCreateNewRepetitionClick} className="card__sidebar__item plus" />
            </div>
        );
    };

    const renderRepetitionList = (): JSX.Element[] | undefined => {
        const sortedRepetitionList = currentRepetitionList?.sort(
            (a, b) => parseInt(a.number_of_set) - parseInt(b.number_of_set),
        );
        return sortedRepetitionList?.map((repetitionItem, index) => (
            <RepetitionItem
                key={index}
                repetition={repetitionItem}
                onEditDoneBtnClick={(obj: RepetitionModel) => handleRepEditDoneBtnClick(obj)}
            />
        ));
    };

    const renderTableRowEditor = (): JSX.Element => {
        return (
            <li className="list-item table-row">
                <div className="list-item__ceils">
                    <span>{currentRepetitionList?.length ? (currentRepetitionList?.length + 1).toString() : '1'}</span>
                    <InputNumber value={newRepWeight ?? ''} onChange={handleWeightChange} />
                    <InputNumber value={newAmountOfReps ?? ''} onChange={handleAmountOfRepsChange} />
                </div>

                <RightArrow onClick={handleEditDoneBtnClick} className="right-arrow" />
            </li>
        );
    };

    return (
        currentWorkout && (
            <Card
                key={ECardType.CREATE_NEW_EXERCISE}
                className="workout-item-card"
                isSideBar
                sideBar={renderSideBar()}
                titleRight={currentExercise?.workout_name}
                titleLeft={moment(currentWorkout.date).format('DD.MM.YYYY')}
                onExitClick={handleExitBtnClick}
            >
                <div className="workout-item-card__content">
                    <div className="workout-item-card__repetitions">
                        <div className="repetitions-header">
                            <span>Подход</span>
                            <span>Bec</span>
                            <span>Повторов</span>
                        </div>
                        <ul className="repetitions-list">
                            <Scrollbar>{renderRepetitionList()}</Scrollbar>
                        </ul>
                        {isCreatorShown && renderTableRowEditor()}
                    </div>
                </div>
            </Card>
        )
    );
};

export default RepetitionsListCard;
