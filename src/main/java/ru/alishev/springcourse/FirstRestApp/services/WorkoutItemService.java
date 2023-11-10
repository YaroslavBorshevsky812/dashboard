package ru.alishev.springcourse.FirstRestApp.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.alishev.springcourse.FirstRestApp.entity.WorkoutItemEntity;
import ru.alishev.springcourse.FirstRestApp.repositories.WorkouItemRepository;

import java.util.List;
import java.util.Optional;


@Service
@Transactional(readOnly = true)
public class WorkoutItemService {

    private final WorkouItemRepository workouItemRepository;

    @Autowired
    public WorkoutItemService(WorkouItemRepository workouItemRepository) {
        this.workouItemRepository = workouItemRepository;
    }

    public List<WorkoutItemEntity> findAll() {
        return workouItemRepository.findAll();
    }

    public WorkoutItemEntity findOne(int id) {
        Optional<WorkoutItemEntity> foundWorkoutItem = workouItemRepository.findById(id);
        return foundWorkoutItem.orElse(null);
    }

    @Transactional
    public WorkoutItemEntity save(WorkoutItemEntity workoutItemEntity) {
        return workouItemRepository.save(workoutItemEntity);
    }

    @Transactional
    public void delete(int id) {
        workouItemRepository.deleteById(id);
    }
}
