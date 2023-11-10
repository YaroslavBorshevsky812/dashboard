package ru.alishev.springcourse.FirstRestApp.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.alishev.springcourse.FirstRestApp.dto.MaxWeightDTO;
import ru.alishev.springcourse.FirstRestApp.dto.TotalWeightPureExercise;
import ru.alishev.springcourse.FirstRestApp.entity.WorkoutDayEntity;
import ru.alishev.springcourse.FirstRestApp.entity.WorkoutItemEntity;
import ru.alishev.springcourse.FirstRestApp.repositories.WorkoutDayRepository;

import java.util.List;
import java.util.Optional;


@Service
@Transactional(readOnly = true)
public class WorkoutDayService {

    private final WorkoutDayRepository workoutDayRepository;

    @Autowired
    public WorkoutDayService(WorkoutDayRepository workoutDayRepository) {
        this.workoutDayRepository = workoutDayRepository;
    }

    public List<WorkoutDayEntity> findAll() {
        return workoutDayRepository.findAll();
    }

    public List<WorkoutDayEntity> findAllByPersonId(int personId) {
        return workoutDayRepository.getWorkoutDaysByPersonId(personId);
    }

    public WorkoutDayEntity findOne(int id) {
        Optional<WorkoutDayEntity> foundWorkoutDay = workoutDayRepository.findById(id);
        return foundWorkoutDay.orElse(null);
    }

    @Transactional
    public WorkoutDayEntity save(WorkoutDayEntity workoutDayEntity) {
        return workoutDayRepository.save(workoutDayEntity);
    }

    @Transactional
    public void deleteWorkoutDay(int id) {
        workoutDayRepository.deleteById(id);
    }

    @Transactional
    public List<MaxWeightDTO> getMaxWeightPureExercise() {
        return  workoutDayRepository.getMaxWeight();
    }

    @Transactional
    public List<TotalWeightPureExercise> getTotalWeightPureExercise() {return workoutDayRepository.getTotalWeightPureExercise();}
}
