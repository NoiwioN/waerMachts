package net.ictcampus.waerMachts.controller.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import net.ictcampus.waerMachts.controller.services.SkillService;
import net.ictcampus.waerMachts.model.models.Skill;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.persistence.EntityNotFoundException;
import java.util.Optional;

@RestController
@RequestMapping(path = "/skills")
public class SkillController {

    private final SkillService skillService;

    @Autowired
    public SkillController(SkillService skillService) {
        this.skillService = skillService;
    }

    @GetMapping
    @Operation(summary = "Find all Skills or only skills by name")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Skills found", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = Skill.class))}),
            @ApiResponse(responseCode = "404", description = "Skill not found", content = @Content)})
    public Iterable<Skill> findAllOrByName(@RequestParam(required = false) String name) {
        try {
            if (name != null) {
                return skillService.findByName(name);
            } else {
                return skillService.findAll();
            }
        } catch (EntityNotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Movie not found");
        }
    }
    @GetMapping(path = "{id}")
    @Operation(summary = "Finds skill by id")
    public Optional<Skill> findById(@PathVariable Integer id){
        try{
            return skillService.findById(id);
        } catch (EntityNotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Skill not found");
        }
    }
}