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
}
