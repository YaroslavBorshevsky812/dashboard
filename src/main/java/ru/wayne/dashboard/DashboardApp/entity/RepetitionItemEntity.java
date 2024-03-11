package ru.wayne.dashboard.DashboardApp.entity;

import javax.persistence.*;

@Entity
@Table(name = "repetitionitem")
public class RepetitionItemEntity {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "workout_item_id", referencedColumnName = "id")
    private WorkoutItemEntity workout_item;

    @Column(name = "number_of_set")
    private String number_of_set;

    @Column(name = "weight")
    private int weight;

    @Column(name = "repetitions_number")
    private int repetitions_number;

    public RepetitionItemEntity() {}


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public WorkoutItemEntity getWorkout_item() {
        return workout_item;
    }

    public void setWorkout_item(WorkoutItemEntity workout_item) {
        this.workout_item = workout_item;
    }

    public String getNumber_of_set() {
        return number_of_set;
    }

    public void setNumber_of_set(String number_of_set) {
        this.number_of_set = number_of_set;
    }

    public int getWeight() {
        return weight;
    }

    public void setWeight(int weight) {
        this.weight = weight;
    }

    public int getRepetitions_number() {
        return repetitions_number;
    }

    public void setRepetitions_number(int repetitions_number) {
        this.repetitions_number = repetitions_number;
    }
}
