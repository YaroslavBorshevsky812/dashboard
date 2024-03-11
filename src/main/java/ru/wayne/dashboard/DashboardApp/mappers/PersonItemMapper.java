package ru.wayne.dashboard.DashboardApp.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import ru.wayne.dashboard.DashboardApp.dto.PersonDTO;
import ru.wayne.dashboard.DashboardApp.entity.PersonEntity;

@Mapper
public interface PersonItemMapper {
    PersonItemMapper INSTANCE = Mappers.getMapper( PersonItemMapper.class);
    PersonDTO toDTO(PersonEntity personEntity);
    PersonEntity toEntity(PersonDTO personDTO);
}
