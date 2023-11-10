package ru.alishev.springcourse.FirstRestApp.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.alishev.springcourse.FirstRestApp.entity.RepetitionItemEntity;
import ru.alishev.springcourse.FirstRestApp.repositories.RepetitionItemRepository;

import java.util.List;
import java.util.Optional;


@Service
@Transactional(readOnly = true)
public class RepetitionItemService {

    private final RepetitionItemRepository repetitionItemRepository;

    @Autowired
    public RepetitionItemService(RepetitionItemRepository repetitionItemRepository) {
        this.repetitionItemRepository = repetitionItemRepository;
    }

    public List<RepetitionItemEntity> findAll() {
        return repetitionItemRepository.findAll();
    }

    public RepetitionItemEntity findOne(int id) {
        Optional<RepetitionItemEntity> foundRepetitionItem = repetitionItemRepository.findById(id);
        return foundRepetitionItem.orElse(null);
    }

    @Transactional
    public RepetitionItemEntity save(RepetitionItemEntity workoutItemEntity) {
        return repetitionItemRepository.save(workoutItemEntity);
    }

    @Transactional
    public RepetitionItemEntity update(RepetitionItemEntity repetitionItemEntity) {
        return repetitionItemRepository.save(repetitionItemEntity);
    }

    @Transactional
    public void delete(int id) {
        repetitionItemRepository.deleteById(id);
    }
}
