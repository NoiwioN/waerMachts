package net.ictcampus.waerMachts.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

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
}


