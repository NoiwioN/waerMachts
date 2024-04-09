package net.ictcampus.waerMachts.controller.services;


import net.ictcampus.waerMachts.model.models.InseratSkill;
import net.ictcampus.waerMachts.model.models.Skill;
import net.ictcampus.waerMachts.model.repositories.InseratSkillRepository;
import net.ictcampus.waerMachts.model.repositories.SkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.Optional;

@Service
public class InseratSkillService {
    private final InseratSkillRepository inseratSkillRepository;
    private final SkillRepository skillRepository;
    @Autowired
    public InseratSkillService(InseratSkillRepository inseratSkillRepository, SkillRepository skillRepository) {
        this.inseratSkillRepository = inseratSkillRepository;
        this.skillRepository = skillRepository;
    }

    public InseratSkill create(InseratSkill inseratSkill){
        return inseratSkillRepository.save(inseratSkill);
    }

    public Iterable<Skill> findSkillsByInseratId(Integer id){
        return inseratSkillRepository.findSkillIdsByInserate(id);
    }

    public Iterable<InseratSkill> findAll(){
        return inseratSkillRepository.findAll();
    }

    public InseratSkill findById(Integer id){
        Optional<InseratSkill> inseratSkill = inseratSkillRepository.findById(id);
        return inseratSkill.orElseThrow(EntityNotFoundException::new);
    }
    public void update(InseratSkill inseratSkill){
        inseratSkillRepository.save(inseratSkill);
    }
    public void deleteById(Integer id){
        inseratSkillRepository.deleteById(id);
    }

}
