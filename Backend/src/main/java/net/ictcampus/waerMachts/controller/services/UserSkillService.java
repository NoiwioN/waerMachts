package net.ictcampus.waerMachts.controller.services;

import net.ictcampus.waerMachts.model.models.Skill;
import net.ictcampus.waerMachts.model.models.User;
import net.ictcampus.waerMachts.model.repositories.UserSkillRepository;
import org.springframework.stereotype.Service;

@Service
public class UserSkillService {
    private final UserSkillRepository userSkillRepository;

    public UserSkillService(UserSkillRepository userSkillRepository) {
        this.userSkillRepository = userSkillRepository;
    }

    public Iterable<Skill> findSkillsByUserId (Integer userId) {
        return userSkillRepository.findSkillByUserId(userId);
    }
    public Iterable<User> findUsersBySkillId (Integer skillId){
        return userSkillRepository.findUserBySkillId(skillId);
    }
}
