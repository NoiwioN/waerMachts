package net.ictcampus.waerMachts.model.repositories;

import net.ictcampus.waerMachts.model.models.Skill;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface SkillRepository extends CrudRepository<Skill,Integer> {
    @Query("SELECT s FROM Skill s WHERE s.name LIKE CONCAT('%', :name, '%')")
    Iterable<Skill> findByName(@Param("name") String name);

}
