package ru.alishev.springcourse.FirstRestApp.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import ru.alishev.springcourse.FirstRestApp.dto.WorkoutItemDTO;
import ru.alishev.springcourse.FirstRestApp.entity.WorkoutItemEntity;

@Mapper
public interface WorkoutItemMapper {

    WorkoutItemMapper INSTANCE = Mappers.getMapper( WorkoutItemMapper.class);
    WorkoutItemDTO toDTO(WorkoutItemEntity workoutItemEntity);

    WorkoutItemEntity toEntity(WorkoutItemDTO workoutItemDTO);
}
