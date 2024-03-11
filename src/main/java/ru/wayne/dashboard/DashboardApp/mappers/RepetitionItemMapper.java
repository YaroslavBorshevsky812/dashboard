package ru.wayne.dashboard.DashboardApp.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import ru.wayne.dashboard.DashboardApp.dto.RepetitionItemDTO;
import ru.wayne.dashboard.DashboardApp.entity.RepetitionItemEntity;

@Mapper
public interface RepetitionItemMapper {

    RepetitionItemMapper INSTANCE = Mappers.getMapper( RepetitionItemMapper.class);
    RepetitionItemDTO toDTO(RepetitionItemEntity repetitionItemEntity);
    RepetitionItemEntity toEntity(RepetitionItemDTO repetitionItemDTO);
}
