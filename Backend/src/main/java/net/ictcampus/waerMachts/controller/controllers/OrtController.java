package net.ictcampus.waerMachts.controller.controllers;

import net.ictcampus.waerMachts.controller.services.OrtService;
import net.ictcampus.waerMachts.model.models.Ort;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping(path = "/orte")
public class OrtController {
    private final OrtService ortService;

    public OrtController(OrtService ortService) {
        this.ortService = ortService;
    }

    @GetMapping
    public Ort findOrtByIdentifier(@RequestParam(required = false) Integer userId,
                                   @RequestParam(required = false) Integer PLZ,
                                   @RequestParam(required = false) String ort) {
        try {
            if (userId != null && (PLZ != null && ort != null)) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Ungültige Anfrage");
            }
            if (userId != null) {
                return ortService.findOrtByUserId(userId);
            }
            if (PLZ != null && ort != null) {
                return ortService.findOrtByPLZAndOrt(PLZ, ort);
            }
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Ungültige Anfrage");
        } catch (ResponseStatusException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Ungültige Anfrage");
        }
    }
    @PostMapping(consumes = "application/json")
    public Ort save(@RequestBody Ort ort){
        try{
             return ortService.saveOrt(ort);
        }catch(Exception e){
            System.out.println("Fehler: " + e.getMessage());
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Ungültige Anfrage");
        }
    }
}
