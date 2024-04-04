package net.ictcampus.waerMachts.model.models;

import javax.persistence.*;
@Entity

public class InseratSkill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_inserat_skill;

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
