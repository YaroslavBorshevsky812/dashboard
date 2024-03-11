package ru.wayne.dashboard.DashboardApp.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import ru.wayne.dashboard.DashboardApp.dto.WorkoutDayDTO;
import ru.wayne.dashboard.DashboardApp.entity.WorkoutDayEntity;

@Mapper
public interface WorkoutDayMapper {

    WorkoutDayMapper INSTANCE = Mappers.getMapper( WorkoutDayMapper.class );
    WorkoutDayDTO toDTO(WorkoutDayEntity workoutDayEntity);

    WorkoutDayEntity toEntity(WorkoutDayDTO workoutDayDTO);
}
