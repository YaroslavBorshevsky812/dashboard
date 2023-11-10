package ru.alishev.springcourse.FirstRestApp.entity;


import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "workoutitem")
public class WorkoutItemEntity {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "workout_name")
    private String workout_name;

    @ManyToOne()
    @JoinColumn(name = "training_day_id", referencedColumnName = "id")
    private WorkoutDayEntity dayOfWorkout;

    @OneToMany(mappedBy = "workout_item", cascade = {CascadeType.ALL})
    private List<RepetitionItemEntity> repetitions;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getWorkout_name() {
        return workout_name;
    }

    public void setWorkout_name(String workout_name) {
        this.workout_name = workout_name;
    }

    public WorkoutDayEntity getDayOfWorkout() {
        return dayOfWorkout;
    }

    public void setDayOfWorkout(WorkoutDayEntity dayOfWorkout) {
        this.dayOfWorkout = dayOfWorkout;
    }

    public List<RepetitionItemEntity> getRepetitions() {
        return repetitions;
    }

    public void setRepetitions(List<RepetitionItemEntity> items) {
        this.repetitions = items;
    }

    public WorkoutItemEntity() {}
}
