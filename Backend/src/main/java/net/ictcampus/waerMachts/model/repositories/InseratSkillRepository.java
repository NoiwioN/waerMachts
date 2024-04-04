package net.ictcampus.waerMachts.model.repositories;


import net.ictcampus.waerMachts.model.models.InseratSkill;
import net.ictcampus.waerMachts.model.models.Skill;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface InseratSkillRepository extends CrudRepository<InseratSkill, Integer> {

    @Query("select s from  InseratSkill inskill join inskill.skill s join inskill.inserat i  where i.id_inserat=:id")
    Iterable<Skill> findSkillIdsByInserate(@Param("id") Integer id);
}
