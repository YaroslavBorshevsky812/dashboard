package ru.wayne.dashboard.DashboardApp.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ru.wayne.dashboard.DashboardApp.dto.*;
import ru.wayne.dashboard.DashboardApp.entity.PersonEntity;
import ru.wayne.dashboard.DashboardApp.entity.WorkoutDayEntity;
import ru.wayne.dashboard.DashboardApp.mappers.WorkoutDayMapper;
import ru.wayne.dashboard.DashboardApp.services.PersonDetailsService;
import ru.wayne.dashboard.DashboardApp.services.RepetitionItemService;
import ru.wayne.dashboard.DashboardApp.services.WorkoutDayService;
import ru.wayne.dashboard.DashboardApp.services.WorkoutItemService;

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

    @GetMapping("/info/{id}")
    public StatisticDTO getMaxWeightPureExercise(@PathVariable("id") int id) {
        return new StatisticDTO(workoutDayService.getTotalWeightPureExercise(id), workoutDayService.getMaxWeightPureExercise(id));
    }
}
