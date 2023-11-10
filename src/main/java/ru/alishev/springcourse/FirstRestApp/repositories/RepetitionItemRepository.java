package ru.alishev.springcourse.FirstRestApp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.alishev.springcourse.FirstRestApp.entity.RepetitionItemEntity;

@Repository
public interface RepetitionItemRepository extends JpaRepository<RepetitionItemEntity, Integer> {}
