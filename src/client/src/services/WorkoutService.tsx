import axios from 'axios';
import { Observable } from '../utils/Observable';
import { WorkoutModel } from '../Models/WorkoutModel';
import { RepetitionModel } from '../Models/RepetitionModel';
import { WorkoutCreationRequestModel } from '../Models/WorkoutCreationRequestModel';
import { ExerciseCreationModel } from '../Models/ExerciseCreationModel';
import { ExerciseModel } from '../Models/ExerciseModel';
import { RepetitionCreationModel } from '../Models/RepetitionCreationModel';

export const storeWorkoutService = {
    /** Список тренировок. */
    workoutList: new Observable<WorkoutModel[]>([]),
    /** Список упражнений конкретной тренировки. */
    currentExerciseList: new Observable([]),
    /** Идентификатор текущей тренировки. */
    currentWorkoutId: new Observable<number | null>(null),
    /** Текущая тренировка. */
    currentWorkout: new Observable<WorkoutModel | null>(null),
    /** Текущий список подходов. */
    currentRepetitionList: new Observable<RepetitionModel[] | null>(null),
    /** Текущее упражнение. */
    currentExercise: new Observable<any | null>(null),
};

class WorkoutService {
    private static s: WorkoutService | null = null;

    public static get service(): WorkoutService {
        if (WorkoutService.s === null) {
            WorkoutService.s = new WorkoutService();
        }

        return WorkoutService.s;
    }

    setCurrentWorkoutId = (id: number): void => {
        storeWorkoutService.currentWorkoutId.set(id);
    };

    setCurrentExerciseList = (exercises: []) => {
        storeWorkoutService.currentExerciseList.set(exercises);
    };

    setCurrentWorkout = (workout: WorkoutModel) => {
        storeWorkoutService.currentWorkout.set(workout);
    };

    setCurrentRepetitionList = (reps: RepetitionModel[]) => {
        storeWorkoutService.currentRepetitionList.set(reps);
    };

    setCurrentExercise = (exercise: ExerciseModel) => {
        storeWorkoutService.currentExercise.set(exercise);
    };

    getLocalStorageInfo = () => {
        const jwt = JSON.parse(localStorage.getItem('jwt') ?? '');
        const personId = JSON.parse(localStorage.getItem('personId') ?? '');

        const result = {
            jwt: jwt,
            personId: personId,
        };
        return result;
    };

    requestWorkoutListFromServer = (): Promise<any> => {
        const { jwt, personId } = this.getLocalStorageInfo();
        return axios({
            method: 'get',
            url: `http://localhost:8080/dashboard/${personId}`,
            withCredentials: false,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${jwt}`,
            },
        }).then((response) => {
            storeWorkoutService.workoutList.set(response.data);
        });
    };

    requestWorkoutFromServer = (workoutId: number): Promise<any> => {
        const { jwt } = this.getLocalStorageInfo();
        return axios({
            method: 'get',
            url: `http://localhost:8080/dashboard/item/${workoutId}`,
            withCredentials: false,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded', Authorization: `Bearer ${jwt}` },
        });
    };

    requestRepetitionListFromServer = (currentExerciseId: number): Promise<any> => {
        const { jwt } = this.getLocalStorageInfo();
        return axios({
            method: 'get',
            url: `http://localhost:8080/workout/${currentExerciseId}`,
            withCredentials: false,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded', Authorization: `Bearer ${jwt}` },
        });
    };

    requestWorkoutInfoFromServer = (): Promise<any> => {
        const { jwt } = this.getLocalStorageInfo();
        return axios({
            method: 'get',
            url: `http://localhost:8080/dashboard/info`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`,
            },
        });
    };

    createNewWorkout = (obj: WorkoutCreationRequestModel): Promise<any> => {
        console.log('!');

        const { jwt, personId } = this.getLocalStorageInfo();
        return axios({
            method: 'post',
            url: `http://localhost:8080/dashboard`,
            data: JSON.stringify({
                date: obj.date,
                title: obj.title,
                person_id: personId,
            }),
            withCredentials: false,
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${jwt}` },
        });
    };

    createNewExercise = (obj: ExerciseCreationModel): Promise<any> => {
        const { jwt } = this.getLocalStorageInfo();
        return axios({
            method: 'post',
            url: `http://localhost:8080/workout`,
            data: JSON.stringify({
                training_day_id: obj.training_day_id,
                workout_name: obj.workout_name,
            }),
            withCredentials: false,
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${jwt}` },
        });
    };

    createNewRepetiton = (obj: RepetitionCreationModel): Promise<any> => {
        const { jwt } = this.getLocalStorageInfo();
        return axios({
            method: 'post',
            url: `http://localhost:8080/repetitions`,
            data: JSON.stringify({
                workout_item_id: obj.workout_item_id,
                number_of_set: obj.number_of_set,
                weight: obj.weight,
                repetitions_number: obj.repetitions_number,
            }),
            withCredentials: false,
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${jwt}` },
        });
    };

    deleteWorkoutFromServer = (workoutId: number): Promise<any> => {
        const { jwt } = this.getLocalStorageInfo();
        return axios({
            method: 'delete',
            url: `http://localhost:8080/dashboard/${workoutId}`,
            withCredentials: false,
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${jwt}` },
        });
    };

    deleteExerciseFromServer = (exerciseId: number): Promise<any> => {
        const { jwt } = this.getLocalStorageInfo();
        return axios({
            method: 'delete',
            url: `http://localhost:8080/workout/${exerciseId}`,
            withCredentials: false,
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${jwt}` },
        });
    };

    updateRepetitionItem = (obj: RepetitionModel): Promise<any> => {
        const { jwt } = this.getLocalStorageInfo();
        return axios({
            method: 'patch',
            url: `http://localhost:8080/repetitions`,
            data: JSON.stringify({
                id: obj.id,
                workout_item_id: obj.workout_item_id,
                number_of_set: obj.number_of_set,
                weight: obj.weight,
                repetitions_number: obj.repetitions_number,
            }),
            withCredentials: false,
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${jwt}` },
        });
    };
}

export const workoutService = WorkoutService.service;
