package ru.alishev.springcourse.FirstRestApp.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ru.alishev.springcourse.FirstRestApp.dto.*;
import ru.alishev.springcourse.FirstRestApp.entity.PersonEntity;
import ru.alishev.springcourse.FirstRestApp.entity.WorkoutDayEntity;
import ru.alishev.springcourse.FirstRestApp.mappers.WorkoutDayMapper;
import ru.alishev.springcourse.FirstRestApp.services.PersonDetailsService;
import ru.alishev.springcourse.FirstRestApp.services.RepetitionItemService;
import ru.alishev.springcourse.FirstRestApp.services.WorkoutDayService;
import ru.alishev.springcourse.FirstRestApp.services.WorkoutItemService;

import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;


@RestController
@RequestMapping("/dashboard")
@CrossOrigin
public class WorkoutDayController {

    private final WorkoutDayService workoutDayService;
    private final PersonDetailsService personDetailsService;

    @Autowired
    public WorkoutDayController(WorkoutDayService workoutDayService, PersonDetailsService personService) {
        this.workoutDayService = workoutDayService;
        this.personDetailsService = personService;
    }

    @GetMapping()
    public List<WorkoutDayDTO> getWorkoutDays() {
        return workoutDayService.findAll().stream().map(WorkoutDayMapper.INSTANCE::toDTO).collect(Collectors.toList());
    }

    @GetMapping("/{personId}")
    public List<WorkoutDayDTO> getWorkoutDaysByPersonId(@PathVariable("personId") int personId) {
        return workoutDayService
                .findAllByPersonId(personId)
                .stream()
                .map(WorkoutDayMapper.INSTANCE::toDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/item/{id}")
    public WorkoutDayDTO getWorkoutDay(@PathVariable("id") int id) {
        return WorkoutDayMapper.INSTANCE.toDTO(workoutDayService.findOne(id));
    }

    @PostMapping
    public WorkoutDayDTO create(@RequestBody @Valid WorkoutDayDTO workoutDayDTO,
                       BindingResult bindingResult){
        WorkoutDayEntity workoutDayEntity = WorkoutDayMapper.INSTANCE.toEntity(workoutDayDTO);

        if (workoutDayDTO.getPerson_id() != 0) {
            PersonEntity person = personDetailsService.findOne(workoutDayDTO.getPerson_id());
            workoutDayEntity.setPerson(person);
        }

        WorkoutDayEntity result = workoutDayService.save(workoutDayEntity);
        WorkoutDayDTO responseDayDTO = WorkoutDayMapper.INSTANCE.toDTO(result);
        responseDayDTO.setPerson_id(result.getPerson().getId());

        return responseDayDTO;
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") int id) {
        workoutDayService.deleteWorkoutDay(id);
    }

    @GetMapping("/info")
    public StatisticDTO getMaxWeightPureExercise() {
        return new StatisticDTO(workoutDayService.getTotalWeightPureExercise(), workoutDayService.getMaxWeightPureExercise());
    }
}
