package net.ictcampus.waerMachts.controller.controllers;

import net.ictcampus.waerMachts.controller.services.UserSkillService;
import net.ictcampus.waerMachts.model.models.Skill;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping(path = "/userskills")
public class UserSkillController {
    private final UserSkillService userSkillService;

    public UserSkillController(UserSkillService userSkillService) {
        this.userSkillService = userSkillService;
    }

    @GetMapping
    public Iterable<?> findSkillsByUserId(@RequestParam(required = false) Integer userId, @RequestParam(required = false) Integer skillId) {
        try {
            if((userId!=null&&skillId!=null)||(userId==null&&skillId==null)){
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Ungültige Anfrage");
            }
            if (userId != null) {
                return userSkillService.findSkillsByUserId(userId);
            } else{
                return  userSkillService.findUsersBySkillId(skillId);
            }
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Ungültige Anfrage");
        }
    }
}
