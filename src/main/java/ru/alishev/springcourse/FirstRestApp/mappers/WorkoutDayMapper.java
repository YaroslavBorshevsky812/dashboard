package ru.alishev.springcourse.FirstRestApp.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import ru.alishev.springcourse.FirstRestApp.dto.WorkoutDayDTO;
import ru.alishev.springcourse.FirstRestApp.entity.WorkoutDayEntity;

@Mapper
public interface WorkoutDayMapper {

    WorkoutDayMapper INSTANCE = Mappers.getMapper( WorkoutDayMapper.class );
    WorkoutDayDTO toDTO(WorkoutDayEntity workoutDayEntity);

    WorkoutDayEntity toEntity(WorkoutDayDTO workoutDayDTO);
}
