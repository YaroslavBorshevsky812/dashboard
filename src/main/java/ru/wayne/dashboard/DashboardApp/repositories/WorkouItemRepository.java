package ru.wayne.dashboard.DashboardApp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.wayne.dashboard.DashboardApp.entity.WorkoutItemEntity;

@Repository
public interface WorkouItemRepository extends JpaRepository<WorkoutItemEntity, Integer> {}
