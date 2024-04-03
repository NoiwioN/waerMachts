package net.ictcampus.waerMachts.model.models;

import javax.persistence.*;

@Entity
public class UserSkill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_user_skill;

    @ManyToOne
    @JoinColumn(name="user_id")
    User user;

    @ManyToOne
    @JoinColumn(name="skill_id")
    Skill skill;

}
