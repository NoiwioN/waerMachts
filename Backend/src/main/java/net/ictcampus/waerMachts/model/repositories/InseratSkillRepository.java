package net.ictcampus.waerMachts.model.repositories;


import net.ictcampus.waerMachts.model.models.InseratSkill;
import net.ictcampus.waerMachts.model.models.Skill;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface InseratSkillRepository extends CrudRepository<InseratSkill, Integer> {

    @Query("select s from  InseratSkill as inskill join inskill.skill s  on s.id_skill=inskill.skill_id join inskill.inserat i on i.id_inserat=inskill.inserat_id  where inskill.inserat_id=:id")
    Iterable<Skill> findSkillIdsByInserate(@Param("id") Integer id);
}
