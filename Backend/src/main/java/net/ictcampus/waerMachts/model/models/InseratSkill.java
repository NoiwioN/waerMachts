package net.ictcampus.waerMachts.model.models;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Entity

public class InseratSkill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_inserat_skill;

    @NotNull
    @NotBlank
    private Integer inserat_id;

    @NotNull
    @NotBlank
    private Integer skill_id;

    @ManyToOne
    @JoinColumn(name="inserat_id")
    Inserat inserat;

    @ManyToOne
    @JoinColumn(name="skill_id")
    Skill skill;

    public Integer getId_inserat_skill() {
        return id_inserat_skill;
    }

    public void setId_inserat_skill(Integer id_inserat_skill) {
        this.id_inserat_skill = id_inserat_skill;
    }

    public Inserat getInserat() {
        return inserat;
    }

    public void setInserat(Inserat inserat) {
        this.inserat = inserat;
    }

    public Skill getSkill() {
        return skill;
    }

    public void setSkill(Skill skill) {
        this.skill = skill;
    }
}
