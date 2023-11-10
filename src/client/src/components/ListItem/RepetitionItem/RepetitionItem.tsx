import { FC, useState } from 'react';
import { ReactComponent as Edit } from '../../../assets/icons/edit.svg';
import InputNumber from '../../InputNumber/InputNumber';
import { ReactComponent as RightArrow } from '../../../assets/icons/next.svg';
import { RepetitionModel } from '../../../Models/RepetitionModel';
import { storeWorkoutService } from '../../../services/WorkoutService';
import { useObservable } from '../../../utils/useObservable';
import { ExerciseModel } from '../../../Models/ExerciseModel';

interface Props {
    /** Клик по айтему */
    onItemClick?: () => void;
    /** Подход. */
    repetition?: RepetitionModel;
    /** Событие клика по кнопке готово в редакторе айтема. */
    onEditDoneBtnClick?: (newRep: RepetitionModel) => void;
}

const RepetitionItem: FC<Props> = (props) => {
    const { repetition, onEditDoneBtnClick } = props;

    /** Флаг перехода к редактору. */
    const [isEditMode, setIsEditMode] = useState(false);

    /** Вес подхода. */
    const [weight, setWeight] = useState<number | undefined>(repetition?.weight);
    /** Количество повторений. */
    const [repetitionsNumber, setRepetitionsNumber] = useState<number | undefined>(repetition?.repetitions_number);

    /** Текущее упражнение. */
    const currentExercise = useObservable<ExerciseModel | null>(storeWorkoutService.currentExercise);

    /** Обработчик нажатия на кнопку "готово" во время редактирования подхода. */
    const handleEditActivateBtnClick = () => {
        setIsEditMode(true);
    };

    const handleEditDoneBtnClick = () => {
        if (!repetition?.id || !currentExercise) {
            return;
        }
        const newRepObj: RepetitionModel = {
            id: repetition?.id,
            workout_item_id: currentExercise.id,
            number_of_set: repetition?.number_of_set ?? '',
            weight: weight ?? -1,
            repetitions_number: repetitionsNumber ?? -1,
        };

        const isWeightValid = newRepObj.weight && newRepObj.weight > 0;
        const isRepetitionsNumberValid = newRepObj.repetitions_number && newRepObj.repetitions_number > 0;
        /** Если оба значения равны старым значениям, то не отправляем запрос */
        const isTheSameData =
            newRepObj.weight === repetition.weight && newRepObj.repetitions_number === repetition.repetitions_number;

        if (!isWeightValid || !isRepetitionsNumberValid || isTheSameData) {
            setIsEditMode(false);
            setRepetitionsNumber(repetition.repetitions_number);
            setWeight(repetition.weight);
            return;
        }

        onEditDoneBtnClick && onEditDoneBtnClick(newRepObj);
        setIsEditMode(false);
    };

    /** Обработчик изменения веса. */
    const handleWeightChange = (value: number): void => {
        setWeight(value);
    };

    /** Обработчик изменения количества повторов. */
    const handleRepetitionsNumberChange = (value: number) => {
        setRepetitionsNumber(value);
    };

    const renderSimpleRow = (): JSX.Element => {
        return (
            <li className="list-item table-row">
                <div className="list-item__ceils">
                    <span>{repetition?.number_of_set}</span>
                    <span>{repetition?.weight}</span>
                    <span>{repetition?.repetitions_number}</span>
                </div>
                <Edit onClick={handleEditActivateBtnClick} className="edit-btn" />
            </li>
        );
    };

    const renderEditor = (): JSX.Element => {
        return (
            <li className="list-item table-row">
                <div className="list-item__ceils">
                    <span>{repetition?.number_of_set}</span>
                    <InputNumber onChange={handleWeightChange} value={weight} />
                    <InputNumber onChange={handleRepetitionsNumberChange} value={repetitionsNumber} />
                </div>

                <RightArrow onClick={handleEditDoneBtnClick} className="right-arrow" />
            </li>
        );
    };

    return isEditMode ? renderEditor() : renderSimpleRow();
};

export default RepetitionItem;
