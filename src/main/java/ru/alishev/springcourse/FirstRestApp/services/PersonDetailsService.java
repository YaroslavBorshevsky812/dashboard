package ru.alishev.springcourse.FirstRestApp.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import ru.alishev.springcourse.FirstRestApp.dto.PersonDTO;
import ru.alishev.springcourse.FirstRestApp.entity.PersonEntity;
import ru.alishev.springcourse.FirstRestApp.mappers.PersonItemMapper;
import ru.alishev.springcourse.FirstRestApp.repositories.PersonRepository;

import java.util.Optional;

@Service
public class PersonDetailsService implements UserDetailsService {


    private final PersonRepository personRepository;

    @Autowired
    public PersonDetailsService(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        Optional<PersonEntity> person = personRepository.findByName(s);

        if (person.isEmpty()) {
            throw new UsernameNotFoundException("User not found");
        }

        return person.orElseThrow(() -> new UsernameNotFoundException("Invalid credentials"));
    }

    public PersonEntity findOne(int id) {
        Optional<PersonEntity> person = personRepository.findById(id);
        return person.orElse(null);
    }

    public PersonEntity findByName(String name) {
        Optional<PersonEntity> person = personRepository.findByName(name);
        return person.orElse(null);
    }

    public PersonDTO create(PersonDTO personDTO) {
        PersonEntity personEntity = PersonItemMapper.INSTANCE.toEntity(personDTO);
        PersonEntity result = personRepository.save(personEntity);
        PersonDTO newPersonDto = PersonItemMapper.INSTANCE.toDTO(result);
        newPersonDto.setName(personDTO.getName());


        return newPersonDto;
    }
}
