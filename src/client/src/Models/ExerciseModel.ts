import { RepetitionModel } from "./RepetitionModel";

export interface ExerciseModel {
    id: number;
    workout_name: string;
    repetitions: RepetitionModel[];
}
