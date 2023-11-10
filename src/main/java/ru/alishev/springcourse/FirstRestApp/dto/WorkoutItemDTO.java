package ru.alishev.springcourse.FirstRestApp.dto;

import java.util.List;

public class WorkoutItemDTO {

    private int id;
    private String workout_name;
    private int training_day_id;
    private List<RepetitionItemDTO> repetitions;

    public String getWorkout_name() {
        return workout_name;
    }

    public void setWorkout_name(String workout_name) {
        this.workout_name = workout_name;
    }

    public int getId() {
        return id;
    }

    public int getTraining_day_id() {
        return training_day_id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setTraining_day_id(int training_day_id) {
        this.training_day_id = training_day_id;
    }

    public List<RepetitionItemDTO> getRepetitions() {
        return repetitions;
    }

    public void setRepetitions(List<RepetitionItemDTO> repetitions) {
        this.repetitions = repetitions;
    }
}
