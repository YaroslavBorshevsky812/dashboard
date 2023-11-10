package ru.alishev.springcourse.FirstRestApp.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ru.alishev.springcourse.FirstRestApp.dto.RepetitionItemDTO;
import ru.alishev.springcourse.FirstRestApp.entity.RepetitionItemEntity;
import ru.alishev.springcourse.FirstRestApp.entity.WorkoutItemEntity;
import ru.alishev.springcourse.FirstRestApp.mappers.RepetitionItemMapper;
import ru.alishev.springcourse.FirstRestApp.services.RepetitionItemService;
import ru.alishev.springcourse.FirstRestApp.services.WorkoutItemService;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/repetitions")
@CrossOrigin
public class RepetitionItemController {

    private final RepetitionItemService repetitionItemService;
    private final WorkoutItemService workoutItemService;

    @Autowired
    public RepetitionItemController(RepetitionItemService repetitionItemService, WorkoutItemService workoutItemService) {
        this.repetitionItemService = repetitionItemService;
        this.workoutItemService = workoutItemService;
    }

    @GetMapping()
    public List<RepetitionItemDTO> getWorkoutItems() {
        return repetitionItemService.
                findAll()
                .stream()
                .map(RepetitionItemMapper.INSTANCE::toDTO)
                .collect(Collectors.toList());
    }

    @PostMapping
    public RepetitionItemDTO create(@RequestBody @Valid RepetitionItemDTO repetitionItemDTO,
                                BindingResult bindingResult){
        RepetitionItemEntity repetitionItemEntity = RepetitionItemMapper.INSTANCE.toEntity(repetitionItemDTO);

        if (repetitionItemDTO.getWorkout_item_id() != 0) {
            WorkoutItemEntity currentWorkoutItem = workoutItemService
                    .findOne(repetitionItemDTO.getWorkout_item_id());
            repetitionItemEntity.setWorkout_item(currentWorkoutItem);
        }

        RepetitionItemEntity result = repetitionItemService
                .save(repetitionItemEntity);

        RepetitionItemDTO resultDTO = RepetitionItemMapper.INSTANCE.toDTO(result);
        resultDTO.setWorkout_item_id(result.getWorkout_item().getId());

        return resultDTO;
    }

    @PatchMapping
    public RepetitionItemDTO update(@RequestBody @Valid RepetitionItemDTO repetitionItemDTO,
                                    BindingResult bindingResult){
        RepetitionItemEntity repetitionItemEntity = RepetitionItemMapper.INSTANCE.toEntity(repetitionItemDTO);
        WorkoutItemEntity currentWorkoutItem = workoutItemService
                .findOne(repetitionItemDTO.getWorkout_item_id());

        repetitionItemEntity.setWorkout_item(currentWorkoutItem);

        RepetitionItemEntity result = repetitionItemService
                .save(repetitionItemEntity);

        RepetitionItemDTO resultDTO = RepetitionItemMapper.INSTANCE.toDTO(result);
        resultDTO.setWorkout_item_id(result.getWorkout_item().getId());

        return resultDTO;
    }



    @GetMapping("/{id}")
    public RepetitionItemDTO getWorkoutItem(@PathVariable("id") int id) {
        return RepetitionItemMapper.INSTANCE.toDTO(repetitionItemService.findOne(id));
    }
}
