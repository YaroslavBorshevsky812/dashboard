package ru.wayne.dashboard.DashboardApp.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import ru.wayne.dashboard.DashboardApp.dto.WorkoutItemDTO;
import ru.wayne.dashboard.DashboardApp.entity.WorkoutItemEntity;

@Mapper
public interface WorkoutItemMapper {

    WorkoutItemMapper INSTANCE = Mappers.getMapper( WorkoutItemMapper.class);
    WorkoutItemDTO toDTO(WorkoutItemEntity workoutItemEntity);

    WorkoutItemEntity toEntity(WorkoutItemDTO workoutItemDTO);
}
