package net.ictcampus.waerMachts.model.repositories;


import net.ictcampus.waerMachts.model.models.InseratSkill;
import net.ictcampus.waerMachts.model.models.Skill;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface InseratSkillRepository extends CrudRepository<InseratSkill, Integer> {

    @Query("select s.id_skill from Skill s join InseratSkill as inskill on s.id_skill=inskill.skill_id where inskill.skill_id=:id")
    Iterable<Integer> findSkillIdsByInserate(@Param("id") Integer id);
}
