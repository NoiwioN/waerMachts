package net.ictcampus.waerMachts.model.models;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Set;

@Entity
public class Inserat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_inserat;
    private String darstellungs_bild;
    private String titel;
    private String beschreibung;

    @ManyToOne
    @JoinColumn(name = "auftraggeber_id")
    private User auftraggeber_id;
    @ManyToOne
    @JoinColumn(name = "auftragnehmer_id")
    private User auftragnehmer_id;
    private Boolean fertig_auftraggeber;
    private Boolean fertig_auftragnehmer;
    private String art;
    private Double preis;
    @ManyToOne
    @JoinColumn(name = "ort_id")
    private Ort ort;
    private LocalDate erstellt_am;
    private LocalDate fertig_am;
    private Float bewertung;
    private String bewertungstext;
    @OneToMany(mappedBy = "inserat")
    @JsonBackReference
    Set<InseratSkill> skills;

    public Integer getId_inserat() {
        return id_inserat;
    }

    public void setId_inserat(Integer id_inserat) {
        this.id_inserat = id_inserat;
    }

    public String getDarstellungs_bild() {
        return darstellungs_bild;
    }

    public void setDarstellungs_bild(String darstellungs_bild) {
        this.darstellungs_bild = darstellungs_bild;
    }

    public String getTitel() {
        return titel;
    }

    public void setTitel(String titel) {
        this.titel = titel;
    }

    public String getBeschreibung() {
        return beschreibung;
    }

    public void setBeschreibung(String beschreibung) {
        this.beschreibung = beschreibung;
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

    public Boolean getFertig_auftraggeber() {
        return fertig_auftraggeber;
    }

    public void setFertig_auftraggeber(Boolean fertig_auftraggeber) {
        this.fertig_auftraggeber = fertig_auftraggeber;
    }

    public Boolean getFertig_auftragnehmer() {
        return fertig_auftragnehmer;
    }

    public void setFertig_auftragnehmer(Boolean fertig_auftragnehmer) {
        this.fertig_auftragnehmer = fertig_auftragnehmer;
    }

    public String getArt() {
        return art;
    }

    public void setArt(String art) {
        this.art = art;
    }

    public Double getPreis() {
        return preis;
    }

    public void setPreis(Double preis) {
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

    public Float getBewertung() {
        return bewertung;
    }

    public void setBewertung(Float bewertung) {
        this.bewertung = bewertung;
    }

    public String getBewertungstext() {
        return bewertungstext;
    }

    public void setBewertungstext(String bewertungstext) {
        this.bewertungstext = bewertungstext;
    }

    public Set<InseratSkill> getSkills() {
        return skills;
    }

    public void setSkills(Set<InseratSkill> skills) {
        this.skills = skills;
    }
}