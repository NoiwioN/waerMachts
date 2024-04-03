package net.ictcampus.waerMachts.controller.controllers;

import net.ictcampus.waerMachts.controller.services.UserService;
import net.ictcampus.waerMachts.model.models.User;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.persistence.EntityNotFoundException;
import javax.validation.Valid;
import java.util.ArrayList;

@RestController
@RequestMapping(path = "/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping(path = "{id}")
    public User findById(@PathVariable String id) {
        try {
            return userService.findByEmail(id);
        } catch (EntityNotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Benutzer wurde nicht gefunden");
        }
    }

    @GetMapping
    public Iterable<User> findAll(@RequestParam(required = false) String email) {
        if (email != null) {
            try {
                User user = userService.findByEmail(email);
                ArrayList<User> u = new ArrayList<>();
                u.add(user);
                return u;
            } catch (EntityNotFoundException e) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Benutzer wurde nicht gefunden");
            }
        } else {
            try {
                return userService.findAll();
            } catch (EntityNotFoundException e) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Benutzer wurde nicht gefunden");
            }
        }

    }

    @PutMapping(consumes = "application/json", path = "{id}")
    public void update(@Valid @RequestBody User user, @RequestParam Integer id) {
        try {
            userService.findById(id);
            userService.update(user);
        } catch (RuntimeException e) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Benutzer konnte nicht aktualisiert werden");
        }
    }

    @PostMapping(consumes = "application/json",path = "/sign-up")
    public void signUp(@Validated @RequestBody User user) {
        try {
            userService.signUp(user);
        } catch (RuntimeException e) {
            System.out.println(e.getMessage());
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Benutzer konnte nicht erstellt werden");
        }
    }

    @DeleteMapping(path = "{id}")
    public void deleteById(@PathVariable Integer id) {
        try {
            userService.deleteById(id);
        } catch (RuntimeException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Benutzer wurde nicht gefunden");
        }
    }

}
