package net.ictcampus.waerMachts.model.models;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Set;

@Entity
public class Skill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_skill;

    @NotBlank
    @NotNull
    private String name;


    // getter and setter

    public Integer getId_skill() {
        return id_skill;
    }

    public void setId_skill(Integer id_skill) {
        this.id_skill = id_skill;
    }

    @OneToMany(mappedBy = "User")
            @JsonBackReference
    Set<UserSkill> skillsByUser;


}


