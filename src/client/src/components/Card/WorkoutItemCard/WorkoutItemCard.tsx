import { FC } from 'react';
import './workoutItemCard.scss';
import { storeNavigationService } from '../../../services/NavigationService';
import { ECardType } from '../../../utils/enums/Enums';
import { useObservable } from '../../../utils/useObservable';
import WorkoutEditor from '../CreateWorkoutCard/CreateWorkoutCard';
import ExerciseListCard from '../ExerciseListCard/ExerciseListCard';
import { storeWorkoutService } from '../../../services/WorkoutService';
import ExercisesTypesCard from '../ExercisesTypesCard/ExercisesTypesCard';
import CreateNewExerciseCard from '../CreateNewExerciseCard/CreateNewExerciseCard';
import RepetitionsListCard from '../RepetitionsListCard/RepetitionsListCard';

interface Props {
    /** Тип карточки (Шаг создания карточки тренировки) */
    cardItemType?: string;
}

const WorkoutItemCard: FC<Props> = () => {
    const workoutItemCardType = useObservable<ECardType | null>(storeNavigationService.workoutItemCardType);

    const currentWorkoutId = useObservable<number | null>(storeWorkoutService.currentWorkoutId);

    const renderCardContent = (): JSX.Element | null => {
        switch (workoutItemCardType) {
            case ECardType.CREATE_NEW_WORKOUT:
                return <WorkoutEditor />;
            case ECardType.EXERCISE_LIST:
                return <ExerciseListCard key={currentWorkoutId} />;
            case ECardType.CHOOSE_EXERCISE_TYPE:
                return <ExercisesTypesCard />;
            case ECardType.CREATE_NEW_EXERCISE:
                return <CreateNewExerciseCard />;
            case ECardType.REPETITIONS_LIST:
                return <RepetitionsListCard />;
            case null:
                return <></>;
        }
    };

    return <div className="workout-item-card__wrapper">{renderCardContent()}</div>;
};

export default WorkoutItemCard;
