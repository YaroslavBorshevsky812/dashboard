import { MaxWeightPureExerciseModel } from '../Models/MaxWeightPureExerciseModel';
import { TotalWeightPureExerciseModel } from '../Models/TotalWeightPureExerciseModel';
import { Observable } from '../utils/Observable';

export const storeWorkoutStatisticService = {
    /** Максимальный вес поднятый в упражнении. */
    maxWeightPureExercise: new Observable<MaxWeightPureExerciseModel[] | null>(null),
    /** Общий вес за упражнение. Тонаж. */
    totalWeightPureExercise: new Observable<TotalWeightPureExerciseModel[] | null>(null),
    /** Список названий упражнений. */
    exerciseTitlesList: new Observable<string[]>([]),
};

class WorkoutStatisticService {
    private static s: WorkoutStatisticService | null = null;

    public static get service(): WorkoutStatisticService {
        if (WorkoutStatisticService.s === null) {
            WorkoutStatisticService.s = new WorkoutStatisticService();
        }

        return WorkoutStatisticService.s;
    }

    setMaxWeightPureExercise = (maxWeight: any): void => {
        storeWorkoutStatisticService.maxWeightPureExercise.set(maxWeight);
    };

    setTotalWeightPureExercise = (maxWeight: any): void => {
        storeWorkoutStatisticService.totalWeightPureExercise.set(maxWeight);
    };

    setExerciseTitlesList = (list: string[]) => {
        storeWorkoutStatisticService.exerciseTitlesList.set(list);
    };
}

export const workoutStatisticService = WorkoutStatisticService.service;
