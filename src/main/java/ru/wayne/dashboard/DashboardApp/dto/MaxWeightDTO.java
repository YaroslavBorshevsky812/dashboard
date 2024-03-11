package ru.wayne.dashboard.DashboardApp.dto;

import java.time.LocalDateTime;

public class MaxWeightDTO {

    private LocalDateTime date;
    private String workout_name;
    private int max_weight;

    public MaxWeightDTO() {
    }

    public MaxWeightDTO(LocalDateTime date) {
        this.date = date;
    }

    public MaxWeightDTO(LocalDateTime date, String workout_name, int max_weight) {
        this.date = date;
        this.workout_name = workout_name;
        this.max_weight = max_weight;
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

    public int getMax_weight() {
        return max_weight;
    }

    public void setMax_weight(int max_weight) {
        this.max_weight = max_weight;
    }
}
