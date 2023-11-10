package ru.alishev.springcourse.FirstRestApp.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ru.alishev.springcourse.FirstRestApp.dto.WorkoutItemDTO;
import ru.alishev.springcourse.FirstRestApp.entity.WorkoutDayEntity;
import ru.alishev.springcourse.FirstRestApp.entity.WorkoutItemEntity;
import ru.alishev.springcourse.FirstRestApp.mappers.RepetitionItemMapper;
import ru.alishev.springcourse.FirstRestApp.mappers.WorkoutDayMapper;
import ru.alishev.springcourse.FirstRestApp.mappers.WorkoutItemMapper;
import ru.alishev.springcourse.FirstRestApp.services.RepetitionItemService;
import ru.alishev.springcourse.FirstRestApp.services.WorkoutDayService;
import ru.alishev.springcourse.FirstRestApp.services.WorkoutItemService;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/workout")
@CrossOrigin
public class WorkoutItemController {

    private final WorkoutItemService workoutItemService;
    private final WorkoutDayService workoutDayService;


    @Autowired
    public WorkoutItemController(WorkoutItemService workoutItemService, RepetitionItemService repetitionItemService, WorkoutDayService workoutDayService) {
        this.workoutItemService = workoutItemService;
        this.workoutDayService = workoutDayService;
    }

    @GetMapping()
    public List<WorkoutItemDTO> getWorkoutItems() {
        return workoutItemService.findAll().stream().map(WorkoutItemMapper.INSTANCE::toDTO).collect(Collectors.toList());
    }

    @PostMapping
    public WorkoutItemDTO create(@RequestBody @Valid WorkoutItemDTO workoutItemDTO,
                                BindingResult bindingResult){

        WorkoutItemEntity workoutItemEntity = WorkoutItemMapper.INSTANCE.toEntity(workoutItemDTO);

        if (workoutItemDTO.getTraining_day_id() != 0) {
            WorkoutDayEntity workoutDayEntity = workoutDayService.findOne(workoutItemDTO.getTraining_day_id());
            workoutItemEntity.setDayOfWorkout(workoutDayEntity);
        }

        if (workoutItemDTO.getRepetitions() != null) {
            workoutItemEntity.setRepetitions(workoutItemDTO.getRepetitions()
                    .stream().map(RepetitionItemMapper.INSTANCE::toEntity).collect(Collectors.toList()));
        } else {
            workoutItemEntity.setRepetitions(new ArrayList<>());
        }


        WorkoutItemEntity result = workoutItemService.save(workoutItemEntity);;

        return WorkoutItemMapper.INSTANCE.toDTO(result);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") int id) {
        workoutItemService.delete(id);
    }

    @GetMapping("/{id}")
    public WorkoutItemDTO getWorkoutItem(@PathVariable("id") int id) {
        return WorkoutItemMapper.INSTANCE.toDTO(workoutItemService.findOne(id));
    }
}
