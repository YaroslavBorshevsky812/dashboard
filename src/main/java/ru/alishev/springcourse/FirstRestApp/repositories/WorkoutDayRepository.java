package ru.alishev.springcourse.FirstRestApp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.alishev.springcourse.FirstRestApp.dto.MaxWeightDTO;
import ru.alishev.springcourse.FirstRestApp.dto.TotalWeightPureExercise;
import ru.alishev.springcourse.FirstRestApp.entity.WorkoutDayEntity;


import java.util.List;


@Repository
public interface WorkoutDayRepository extends JpaRepository<WorkoutDayEntity, Integer> {

    @Query("SELECT new ru.alishev.springcourse.FirstRestApp.dto.MaxWeightDTO(wd.date, wi.workout_name, MAX(ri.weight)) " +
            "FROM WorkoutDayEntity wd " +
            "JOIN wd.person p " +
            "JOIN wd.items wi " +
            "JOIN wi.repetitions ri " +
            "WHERE p.id = :personId " +
            "GROUP BY wd.date, wi.workout_name")
    List<MaxWeightDTO> getMaxWeight(@Param("personId") int personId);

    @Query("SELECT new ru.alishev.springcourse.FirstRestApp.dto.TotalWeightPureExercise(wd.date, wi.workout_name, SUM(ri.weight * ri.repetitions_number)) " +
            "FROM WorkoutDayEntity wd " +
            "JOIN wd.person p " +
            "JOIN wd.items wi " +
            "JOIN wi.repetitions ri " +
            "WHERE p.id = :personId " +
            "GROUP BY wd.date, wi.workout_name")
    List<TotalWeightPureExercise> getTotalWeightPureExercise(@Param("personId") int personId);
    @Query("SELECT w FROM WorkoutDayEntity w WHERE w.person.id = :personId")
    List<WorkoutDayEntity> getWorkoutDaysByPersonId(@Param("personId") int personId);
}


