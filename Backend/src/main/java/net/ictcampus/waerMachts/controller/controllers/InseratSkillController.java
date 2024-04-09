package net.ictcampus.waerMachts.controller.controllers;

import io.swagger.v3.oas.annotations.Operation;
import net.ictcampus.waerMachts.controller.services.InseratSkillService;
import net.ictcampus.waerMachts.model.models.InseratSkill;
import net.ictcampus.waerMachts.model.models.Skill;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.persistence.EntityNotFoundException;
import javax.validation.Valid;

@RestController
@RequestMapping(path = "/inseratskill")
public class InseratSkillController {

    private final InseratSkillService inseratSkillService;

    @Autowired
    public InseratSkillController(InseratSkillService inseratSkillService) {
        this.inseratSkillService = inseratSkillService;
    }

    @PostMapping(consumes = "application/json")
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Neuer Eintrag in Zwischentabelle Inserat_Skill")
       public InseratSkill signUp(@Valid @RequestBody InseratSkill inseratSkill) {
        try {
            return inseratSkillService.create(inseratSkill);
        } catch (RuntimeException e) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Konflikt erkannt");
        }
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    @Operation(summary = "Alle inseratSkill-Einträge anzeigen oder skills nach inseraten suchen")
    public Iterable<?> findAll(@RequestParam(required = false) Integer inseratId) {
        try {
            if (inseratId!= null) {

                return inseratSkillService.findSkillsByInseratId(inseratId);
            }
            else{
//
                return inseratSkillService.findAll();
            }

        } catch (EntityNotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Inserat_Skill-Eintrag Nicht gefunden");
        }
    }

    @GetMapping(path = "{id}")
    @Operation(summary = "Suche nach künstlicher ID des Inserats_Skill-Eintrags")
    @ResponseStatus(HttpStatus.OK)
       public InseratSkill findById(@Valid @PathVariable Integer id) {
        try {
            return inseratSkillService.findById(id);
        } catch (EntityNotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Eintrag in Inserat_Skill nicht gefunden");
        }
    }

    @PutMapping(consumes = "application/json", path = "{id}")
    @Operation(summary = "Ergänzung eines Eintrags in der Zwischentabelle Inserat_Skill")
    @ResponseStatus(HttpStatus.OK)
    public void update(@Valid @RequestBody InseratSkill inseratSkill) {
        try {
            inseratSkillService.update(inseratSkill);
        } catch (RuntimeException e) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Konflikt erkannt");
        }
    }

    @DeleteMapping(path = "{id}")
    @Operation(summary = "Löschen eines Eintrags in der Zwischentabelle Inserat-Skill")
    @ResponseStatus(HttpStatus.OK)
        public void deleteById(@Valid @PathVariable Integer id) {
        try {
            inseratSkillService.deleteById(id);
        } catch (RuntimeException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Inserat_Skill nicht gefunden");
        }
    }
}