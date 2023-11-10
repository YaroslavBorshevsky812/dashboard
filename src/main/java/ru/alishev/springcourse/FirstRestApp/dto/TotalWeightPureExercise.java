package ru.alishev.springcourse.FirstRestApp.dto;

import java.time.LocalDateTime;

public class TotalWeightPureExercise {

    private LocalDateTime date;
    private String workout_name;
    private Long total_weight;

    public TotalWeightPureExercise(LocalDateTime date, String workout_name) {
        this.date = date;
        this.workout_name = workout_name;
    }

    public TotalWeightPureExercise() {
    }

    public TotalWeightPureExercise(LocalDateTime date, String workout_name, Long total_weight) {
        this.date = date;
        this.workout_name = workout_name;
        this.total_weight = total_weight;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public String getWorkout_name() {
        return workout_name;
    }

    public void setWorkout_name(String workout_name) {
        this.workout_name = workout_name;
    }

    public Long getTotal_weight() {
        return total_weight;
    }

    public void setTotal_weight(Long total_weight) {
        this.total_weight = total_weight;
    }
}
