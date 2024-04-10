package net.ictcampus.waerMachts.controller.controllers;

import io.swagger.v3.oas.annotations.Operation;
import net.ictcampus.waerMachts.controller.services.InseratService;
import net.ictcampus.waerMachts.model.models.Inserat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.persistence.EntityNotFoundException;
import javax.validation.Valid;

@RestController
@RequestMapping(path = "/inserate")
public class InseratController {

    private final InseratService inseratService;

    @Autowired
    public InseratController(InseratService inseratService) {
        this.inseratService = inseratService;
    }

    @PostMapping(consumes = "application/json")
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "New Genre Created")
    public Inserat create(@Valid @RequestBody Inserat Inserat) {
        try {
            return inseratService.create(Inserat);
        } catch (RuntimeException e) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Conflict occurred");
        }
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    @Operation(summary = "Get alle Inserate")
    public Iterable<?> findAllByIdentifier(@RequestParam(required = false) Integer auftragnehmerId,
                                           @RequestParam(required = false) Integer inseratId,
                                           @RequestParam(required = false) Integer auftraggeberId){
        if (auftragnehmerId != null && inseratId != null &&auftraggeberId!=null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Not found");
        }
        try {
            if (auftragnehmerId != null) {
                return inseratService.findInserateByUserId(auftragnehmerId);
            }
            if (inseratId != null) {
                return inseratService.findUserByInseratId(inseratId);
            }
            if(auftraggeberId!=null){
                return inseratService.findInseratByAuftraggeberId(auftraggeberId);
            }
            return inseratService.findAll();


        } catch (EntityNotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Not found");
        }

    }

    @GetMapping(path = "{id}")
    @Operation(summary = "Suche nach ID")
    @ResponseStatus(HttpStatus.OK)
    public Inserat findById(@Valid @PathVariable Integer id) {
        try {
            return inseratService.findById(id);
        } catch (EntityNotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Genre not found");
        }
    }

    @PutMapping(consumes = "application/json", path = "{id}")
    @Operation(summary = "Update Genre")
    @ResponseStatus(HttpStatus.OK)
    public Inserat update(@Valid @RequestBody Inserat Inserat) {
        try {
           return inseratService.update(Inserat);
        } catch (RuntimeException e) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Conflict occurred");
        }
    }

    @DeleteMapping(path = "{id}")
    @Operation(summary = "Delete a Genre")
    @ResponseStatus(HttpStatus.OK)
    public void deleteById(@Valid @PathVariable Integer id) {
        try {
            inseratService.deleteById(id);
        } catch (RuntimeException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Genre Id not found");
        }
    }
}