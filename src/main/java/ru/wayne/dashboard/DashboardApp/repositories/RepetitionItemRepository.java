package ru.wayne.dashboard.DashboardApp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.wayne.dashboard.DashboardApp.entity.RepetitionItemEntity;

@Repository
public interface RepetitionItemRepository extends JpaRepository<RepetitionItemEntity, Integer> {}
