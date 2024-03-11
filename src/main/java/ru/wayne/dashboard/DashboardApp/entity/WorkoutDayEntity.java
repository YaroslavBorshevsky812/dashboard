package ru.wayne.dashboard.DashboardApp.entity;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;


@Entity
@Table(name = "workoutday")
public class WorkoutDayEntity {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "date")
    private LocalDateTime date;

    @Column(name= "title")
    private String title;

    @OneToMany(mappedBy = "dayOfWorkout", cascade = {CascadeType.ALL})
    private List<WorkoutItemEntity> items;
    @ManyToOne
    @JoinColumn(name = "person_id", referencedColumnName = "id")
    private PersonEntity person;

    public PersonEntity getPerson() {
        return person;
    }

    public void setPerson(PersonEntity person) {
        this.person = person;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public void setItems(List<WorkoutItemEntity> items) {
        this.items = items;
    }

    public List<WorkoutItemEntity> getItems() {
        return items;
    }

    public WorkoutDayEntity() {}

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public WorkoutDayEntity(LocalDateTime date) {
        this.date = date;
    }
}
