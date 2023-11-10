package ru.alishev.springcourse.FirstRestApp.dto;

public class RepetitionItemDTO {

    private int id;
    private int workout_item_id;
    private int weight;
    private String number_of_set;
    private int repetitions_number;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getWorkout_item_id() {
        return workout_item_id;
    }

    public void setWorkout_item_id(int workout_item_id) {
        this.workout_item_id = workout_item_id;
    }

    public int getWeight() {
        return weight;
    }

    public void setWeight(int weight) {
        this.weight = weight;
    }

    public String getNumber_of_set() {
        return number_of_set;
    }

    public void setNumber_of_set(String number_of_set) {
        this.number_of_set = number_of_set;
    }

    public int getRepetitions_number() {
        return repetitions_number;
    }

    public void setRepetitions_number(int repetitions_number) {
        this.repetitions_number = repetitions_number;
    }
}
