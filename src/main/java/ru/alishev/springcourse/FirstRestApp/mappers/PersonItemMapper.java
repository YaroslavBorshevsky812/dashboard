package ru.alishev.springcourse.FirstRestApp.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import ru.alishev.springcourse.FirstRestApp.dto.PersonDTO;
import ru.alishev.springcourse.FirstRestApp.entity.PersonEntity;

@Mapper
public interface PersonItemMapper {
    PersonItemMapper INSTANCE = Mappers.getMapper( PersonItemMapper.class);
    PersonDTO toDTO(PersonEntity personEntity);
    PersonEntity toEntity(PersonDTO personDTO);
}
