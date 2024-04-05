package net.ictcampus.waerMachts.controller.controllers;

import net.ictcampus.waerMachts.controller.services.OrtService;
import net.ictcampus.waerMachts.model.models.Ort;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping(path = "/orte")
public class OrtController {
    private final OrtService ortService;

    public OrtController(OrtService ortService) {
        this.ortService = ortService;
    }
    @GetMapping
    public Ort findOrtByIdentifier (@RequestParam(required = false) Integer userId) {
        try{
            if(userId!=null){
                return ortService.findOrtByUserId(userId);
            }else{
                throw new Exception("Ungültige Anfrage");
            }
        }catch (Exception e){
           throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Ungültige Anfrage");
        }
    }
}
