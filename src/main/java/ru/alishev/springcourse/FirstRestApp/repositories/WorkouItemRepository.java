package ru.alishev.springcourse.FirstRestApp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.alishev.springcourse.FirstRestApp.entity.WorkoutItemEntity;

@Repository
public interface WorkouItemRepository extends JpaRepository<WorkoutItemEntity, Integer> {}
