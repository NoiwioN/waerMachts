package net.ictcampus.waerMachts.model.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.core.SpringVersion;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Set;


@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_user;

    private String user_bild;
    private Boolean premium_user;
    private String username;
    @NotBlank
    @NotNull
    private String email;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    private String strasse;
    @ManyToOne
    @JoinColumn(name = "ort_id")
    private Ort ort;

    @OneToMany(mappedBy = "user")
    @JsonBackReference(value = "user_skills")
    private Set<UserSkill> skills;

    public User() {
    }

    public Integer getId_user() {
        return id_user;
    }

    public void setId_user(Integer id) {
        this.id_user = id;
    }

    public String getUser_bild() {
        return user_bild;
    }

    public void setUser_bild(String user_bild) {
        this.user_bild = user_bild;
    }

    public Boolean getPremium_user() {
        return premium_user;
    }

    public void setPremium_user(Boolean premium_user) {
        this.premium_user = premium_user;
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String passwort) {
        this.password = passwort;
    }

    public String getStrasse() {
        return strasse;
    }

    public void setStrasse(String strasse) {
        this.strasse = strasse;
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
