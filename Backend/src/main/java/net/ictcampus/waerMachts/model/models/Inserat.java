package net.ictcampus.waerMachts.model.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Inserat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @NotBlank
    private String darstellungs_bild;
    @ManyToOne
    @JoinColumn(name = "auftraggeber_id")
    private User auftraggeber_id;
    @ManyToOne
    @JoinColumn(name = "auftragnehmer_id")
    private User auftragnehmer_id;
    @NotBlank
    private boolean fertig_status;
    @NotBlank
    private String art;
    @NotBlank
    private double preis;
    @ManyToOne
    @JoinColumn(name = "ort_id")
    private Ort ort;
    @NotBlank
    private LocalDate erstellt_am;
    @NotBlank
    private LocalDate fertig_am;
    @NotBlank
    private float bewertung;
    @NotBlank
    private String bewertungstext;
    @OneToMany(mappedBy = "Inserat")
    @JsonBackReference
    Set<Skill> skills;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDarstellungs_bild() {
        return darstellungs_bild;
    }

    public void setDarstellungs_bild(String darstellungs_bild) {
        this.darstellungs_bild = darstellungs_bild;
    }

    public User getAuftraggeber_id() {
        return auftraggeber_id;
    }

    public void setAuftraggeber_id(User auftraggeber_id) {
        this.auftraggeber_id = auftraggeber_id;
    }

    public User getAuftragnehmer_id() {
        return auftragnehmer_id;
    }

    public void setAuftragnehmer_id(User auftragnehmer_id) {
        this.auftragnehmer_id = auftragnehmer_id;
    }

    public boolean isFertig_status() {
        return fertig_status;
    }

    public void setFertig_status(boolean fertig_status) {
        this.fertig_status = fertig_status;
    }

    public String getArt() {
        return art;
    }

    public void setArt(String art) {
        this.art = art;
    }

    public double getPreis() {
        return preis;
    }

    public void setPreis(double preis) {
        this.preis = preis;
    }

    public Ort getOrt() {
        return ort;
    }

    public void setOrt(Ort ort) {
        this.ort = ort;
    }

    public LocalDate getErstellt_am() {
        return erstellt_am;
    }

    public void setErstellt_am(LocalDate erstellt_am) {
        this.erstellt_am = erstellt_am;
    }

    public LocalDate getFertig_am() {
        return fertig_am;
    }

    public void setFertig_am(LocalDate fertig_am) {
        this.fertig_am = fertig_am;
    }

    public float getBewertung() {
        return bewertung;
    }

    public void setBewertung(float bewertung) {
        this.bewertung = bewertung;
    }

    public String getBewertungstext() {
        return bewertungstext;
    }

    public void setBewertungstext(String bewertungstext) {
        this.bewertungstext = bewertungstext;
    }
}