package ru.wayne.dashboard.DashboardApp.dto;

import ru.wayne.dashboard.DashboardApp.entity.WorkoutDayEntity;
import ru.wayne.dashboard.DashboardApp.entity.WorkoutItemEntity;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.OneToMany;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

public class WorkoutDayDTO {

    private int id;

    private LocalDateTime date;
    private String title;

    private List<WorkoutItemDTO> items;

    private int person_id;


    public WorkoutDayDTO() {}

    public LocalDateTime getDate() {
        return date;
    }



    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public int getPerson_id() {
        return person_id;
    }

    public void setPerson_id(int person_id) {
        this.person_id = person_id;
    }

    public List<WorkoutItemDTO> getItems() {
        return items;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setItems(List<WorkoutItemDTO> items) {
        this.items = items;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
    @Override
    public String toString () {
        return "date=" + date
                + ", title=" + title
                + ", person_id=" + person_id;
    }

}
