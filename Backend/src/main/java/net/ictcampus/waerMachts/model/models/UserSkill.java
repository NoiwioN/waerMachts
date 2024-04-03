package net.ictcampus.waerMachts.model.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;

@Entity
public class UserSkill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_user_skill;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name="user_id")
    User user;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name="skill_id")
    Skill skill;

}
