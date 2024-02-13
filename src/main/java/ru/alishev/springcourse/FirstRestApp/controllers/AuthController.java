package ru.alishev.springcourse.FirstRestApp.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import ru.alishev.springcourse.FirstRestApp.dto.AuthCredentialsRequest;
import ru.alishev.springcourse.FirstRestApp.dto.PersonDTO;
import ru.alishev.springcourse.FirstRestApp.entity.PersonEntity;
import ru.alishev.springcourse.FirstRestApp.mappers.PersonItemMapper;
import ru.alishev.springcourse.FirstRestApp.securityConfig.JwtUtil;
import ru.alishev.springcourse.FirstRestApp.services.PersonDetailsService;

import javax.validation.Valid;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtUtil jwtUtil;

    private PersonDetailsService personDetailsService;

    public AuthController(PersonDetailsService personDetailsService) {
        this.personDetailsService = personDetailsService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthCredentialsRequest request) {
        try {
            Authentication authenticate = authenticationManager
                    .authenticate(
                            new UsernamePasswordAuthenticationToken(
                                    request.getName(), request.getPassword()
                            )
                    );

            PersonEntity person = (PersonEntity) authenticate.getPrincipal();

            return ResponseEntity.ok()
                    .header(
                            HttpHeaders.AUTHORIZATION,
                            jwtUtil.generateToken(person)
                    )
                    .body(person);

        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("/registration")
    public ResponseEntity<?> registration(@RequestBody PersonDTO personDTO) {
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        UserDetails person = personDetailsService.findByName(personDTO.getName());

        if (person != null) {
            return ResponseEntity.ok()
                    .body("USER EXISTS");
        } else {
            personDTO.setLogin(personDTO.getName());
            personDTO.setPassword(passwordEncoder.encode(personDTO.getPassword()));
            PersonDTO result = personDetailsService.create(personDTO);

            return ResponseEntity.ok().body(result);
        }
    }
}
