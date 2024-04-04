package net.ictcampus.waerMachts.model.repositories;

import net.ictcampus.waerMachts.model.models.Skill;
import net.ictcampus.waerMachts.model.models.User;
import net.ictcampus.waerMachts.model.models.UserSkill;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserSkillRepository extends CrudRepository<UserSkill, Integer> {
    @Query("SELECT s FROM UserSkill us JOIN us.skill s JOIN us.user u WHERE u.id_user = :userId")
    Iterable<Skill> findSkillByUserId(@Param("userId") Integer userId);
    @Query("SELECT u FROM UserSkill us JOIN us.skill s JOIN us.user u WHERE s.id_skill=:skillId")
    Iterable<User> findUserBySkillId(@Param("skillId") Integer skillId);
}
