package net.ictcampus.waerMachts.model.models;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Ort {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_ort;

    @NotBlank
    @NotNull
    private String ort;

    @OneToMany(mappedBy ="ort")
    @JsonBackReference(value = "ort_users")
    private Set<User> users = new HashSet<>();

    private Integer PLZ;





    //getter and setter
    public Integer getId_ort() {
        return id_ort;
    }

    public void setId_ort(Integer id_ort) {
        this.id_ort = id_ort;
    }

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }

    public Integer getPLZ() {
        return PLZ;
    }

    public void setPLZ(Integer PLZ) {
        this.PLZ = PLZ;
    }



    public String getOrt() {
        return ort;
    }

    public void setOrt(String name) {
        this.ort = name;
    }
}
