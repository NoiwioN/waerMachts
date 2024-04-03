package net.ictcampus.waerMachts.controller.services;

import net.ictcampus.waerMachts.model.models.Skill;
import net.ictcampus.waerMachts.model.repositories.SkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SkillService {
    private final SkillRepository skillRepository;

    @Autowired
public SkillService(SkillRepository skillRepository) {
        this.skillRepository = skillRepository;
    }

    public Iterable<Skill> findAll() {return skillRepository.findAll();}

    public Iterable<Skill> findbyName(String name) {return skillRepository.findByName(name);}
}
