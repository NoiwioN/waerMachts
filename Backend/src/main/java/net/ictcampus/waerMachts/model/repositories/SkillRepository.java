package net.ictcampus.waerMachts.model.repositories;

import net.ictcampus.waerMachts.model.models.Skill;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SkillRepository extends CrudRepository<Skill,Integer> {
}
