package net.ictcampus.waerMachts.controller.services;

import net.ictcampus.waerMachts.model.models.Skill;
import net.ictcampus.waerMachts.model.repositories.SkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SkillService {
    private final SkillRepository skillRepository;

    @Autowired
public SkillService(SkillRepository skillRepository) {
        this.skillRepository = skillRepository;
    }

    public Iterable<Skill> findAll() {return skillRepository.findAll();}

    public Iterable<Skill> findByName(String name) {return skillRepository.findByName(name);}

    public Optional<Skill> findById(Integer id) {return skillRepository.findById(id);}

    public Skill insert(Skill newSkill) {
        return skillRepository.save(newSkill);
    }

    public void update(Skill skill) {skillRepository.save(skill);}

    public void deleteById(Integer id) {skillRepository.deleteById(id);}
}
