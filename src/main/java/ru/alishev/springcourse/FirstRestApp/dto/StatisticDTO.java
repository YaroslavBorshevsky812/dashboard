package ru.alishev.springcourse.FirstRestApp.dto;

import java.util.List;

public class StatisticDTO {

    private List totalWeightPureExercise;
    private List maxWeightPureExercise;

    public List getTotalWeightPureExercise() {
        return totalWeightPureExercise;
    }

    public void setTotalWeightPureExercise(List totalWeightPureExercise) {
        this.totalWeightPureExercise = totalWeightPureExercise;
    }

    public List getMaxWeightPureExercise() {
        return maxWeightPureExercise;
    }

    public void setMaxWeightPureExercise(List maxWeightPureExercise) {
        this.maxWeightPureExercise = maxWeightPureExercise;
    }

    public StatisticDTO(List totalWeightPureExercise, List maxWeightPureExercise) {
        this.totalWeightPureExercise = totalWeightPureExercise;
        this.maxWeightPureExercise = maxWeightPureExercise;
    }
}
