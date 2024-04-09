import { Input } from 'antd';
import Card from '../Card';
import { ECardType } from '../../../utils/enums/Enums';
import './workoutEditor.scss';
import { useState } from 'react';
import moment from 'moment/moment';
import { workoutService } from '../../../services/WorkoutService';
import { WorkoutCreationRequestModel } from '../../../Models/WorkoutCreationRequestModel';
import { WorkoutModel } from '../../../Models/WorkoutModel';
import { navigationService } from '../../../services/NavigationService';
import DatePicker from '../../DatePicker/DatePicker';
import { Icon } from '../../Icon/Icon';

const CreateWorkoutCard = () => {
    const [date, setDate] = useState<string | null>(null);
    const [title, setTitle] = useState<string | null>(null);

    const handleChangeTitle = (e: any) => {
        setTitle(e.target.value);
    };

    const handleDatePicker = (pickedDate: any) => {  
        setDate(moment(pickedDate).toISOString());
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
    };

    return (
        <Card onExitClick={handleExitBtnClick} key={ECardType.CREATE_NEW_WORKOUT} className="workout-item-card">
            <div className="workout-item-card__step-one">
                <DatePicker onChange={handleDatePicker} />
                <Input onChange={handleChangeTitle} placeholder="Введите название" />
                <span onClick={handleCreateNewWorkoutBtnClick} className="right-arrow">
                    <Icon iconName="doube-arrow-right" />
                </span>
            </div>
        </Card>
    );
};

export default CreateWorkoutCard;
