package net.ictcampus.waerMachts.model.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Set;


@Entity
public class User {
    @Id
    private Long id;

    private String username;
    @NotBlank
    @NotNull
    private String email;
    @NotBlank
    @NotNull
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String passwort;
    @ManyToOne
    @JoinColumn(name = "id_ort")
    private Ort ort;

    @OneToMany(mappedBy = "User")
    @JsonBackReference
    private Set<UserSkill> skills;

    public User() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPasswort() {
        return passwort;
    }

    public void setPasswort(String passwort) {
        this.passwort = passwort;
    }

    public Ort getOrt() {
        return ort;
    }

    public void setOrt(Ort ort) {
        this.ort = ort;
    }

    public Set<UserSkill> getSkills() {
        return skills;
    }

    public void setSkills(Set<UserSkill> skills) {
        this.skills = skills;
    }
}
