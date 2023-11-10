package ru.alishev.springcourse.FirstRestApp.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import ru.alishev.springcourse.FirstRestApp.dto.RepetitionItemDTO;
import ru.alishev.springcourse.FirstRestApp.entity.RepetitionItemEntity;

@Mapper
public interface RepetitionItemMapper {

    RepetitionItemMapper INSTANCE = Mappers.getMapper( RepetitionItemMapper.class);
    RepetitionItemDTO toDTO(RepetitionItemEntity repetitionItemEntity);
    RepetitionItemEntity toEntity(RepetitionItemDTO repetitionItemDTO);
}
