package ru.wayne.dashboard.DashboardApp.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.wayne.dashboard.DashboardApp.dto.MaxWeightDTO;
import ru.wayne.dashboard.DashboardApp.dto.TotalWeightPureExercise;
import ru.wayne.dashboard.DashboardApp.entity.WorkoutDayEntity;
import ru.wayne.dashboard.DashboardApp.entity.WorkoutItemEntity;
import ru.wayne.dashboard.DashboardApp.repositories.WorkoutDayRepository;

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
    public List<MaxWeightDTO> getMaxWeightPureExercise(int id) {
        return  workoutDayRepository.getMaxWeight(id);
    }

    @Transactional
    public List<TotalWeightPureExercise> getTotalWeightPureExercise(int id) {
        return workoutDayRepository.getTotalWeightPureExercise(id);
    }
}
