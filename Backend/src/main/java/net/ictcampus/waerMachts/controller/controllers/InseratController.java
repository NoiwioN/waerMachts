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
       public void signUp(@Valid @RequestBody Inserat Inserat) {
        try {
            inseratService.signUp(Inserat);
        } catch (RuntimeException e) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Conflict occurred");
        }
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    @Operation(summary = "Get alle Inserate")
    public Iterable<Inserat> findAllByIdentifier(@RequestParam(required = false)Integer auftragnehmerId) {
        try {
            if(auftragnehmerId!=null){
                return inseratService.findInserateByUserId(auftragnehmerId);
            }else{
                return inseratService.findAll();
            }

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
    public void update(@Valid @RequestBody Inserat Inserat) {
        try {
            inseratService.update(Inserat);
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
            System.out.println(e);
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Genre Id not found");
        }
    }
}