import { DatePicker, Input } from 'antd';
import Card from '../Card';
import { ECardType } from '../../../utils/enums/Enums';
import { ReactComponent as RightArrow } from '../../../assets/icons/next.svg';
import './workoutEditor.scss';
import { useState } from 'react';
import moment from 'moment/moment';
import { workoutService } from '../../../services/WorkoutService';
import { WorkoutCreationRequestModel } from '../../../Models/WorkoutCreationRequestModel';
import { WorkoutModel } from '../../../Models/WorkoutModel';
import { navigationService } from '../../../services/NavigationService';

const CreateWorkoutCard = () => {
    const [date, setDate] = useState<string | null>(null);
    const [title, setTitle] = useState<string | null>(null);

    const handleChangeTitle = (e: any) => {
        setTitle(e.target.value);
    };

    const handleDatePicker = (pickedDate: any) => {
        setDate(moment(pickedDate.$d).toISOString());
    };

    const handleCreateNewWorkoutBtnClick = () => {
        if (date && title) {
            workoutService.createNewWorkout({ date, title } as WorkoutCreationRequestModel).then((response) => {
                const newWorkoutItem: WorkoutModel = response.data;

                workoutService.setCurrentWorkout(newWorkoutItem);
                workoutService.setCurrentWorkoutId(newWorkoutItem.id);

                workoutService.requestWorkoutListFromServer();

                navigationService.setCurrentWorkoutCard(ECardType.EXERCISE_LIST);
            });
        }
    };

    const handleExitBtnClick = (): void => {
        navigationService.setCurrentWorkoutCard(null);
    }

    return (
        <Card onExitClick={handleExitBtnClick} key={ECardType.CREATE_NEW_WORKOUT} className="workout-item-card">
            <div className="workout-item-card__step-one">
                <DatePicker onChange={handleDatePicker} placeholder="Выберете дату" />
                <Input onChange={handleChangeTitle} placeholder="Введите название" />
                <button>
                    <RightArrow onClick={handleCreateNewWorkoutBtnClick} className="right-arrow" />
                </button>
            </div>
        </Card>
    );
};

export default CreateWorkoutCard;
