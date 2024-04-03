package net.ictcampus.waerMachts.controller.controllers;

import io.swagger.v3.oas.annotations.Operation;
import net.bytebuddy.build.Plugin;
import net.ictcampus.waerMachts.controller.services.SkillService;
import net.ictcampus.waerMachts.model.models.Skill;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.persistence.GeneratedValue;

@RestController
@RequestMapping(path = "/skills")
public class SkillController {

    private final SkillService skillService;

    @Autowired
    public SkillController(SkillService skillService) {this.skillService = skillService;}

    @GetMapping
    @Operation(summary = "Find all Skills")
    public Iterable<Skill> findAllSkills(){
        return skillService.findAll();

    }

}
