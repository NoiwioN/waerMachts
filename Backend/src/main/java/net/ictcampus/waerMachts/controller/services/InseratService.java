package net.ictcampus.waerMachts.controller.services;

import net.ictcampus.waerMachts.model.models.Inserat;
import net.ictcampus.waerMachts.model.models.User;
import net.ictcampus.waerMachts.model.repositories.InseratRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.Optional;

@Service
public class InseratService {
    private final InseratRepository inseratRepository;
    @Autowired
    public InseratService(InseratRepository inseratRepository) {
        this.inseratRepository = inseratRepository;
    }

    public Inserat create(Inserat inserat){
        return inseratRepository.save(inserat);
    }

    public Iterable<Inserat> findAll(){
        Iterable<Inserat> inserat = inseratRepository.findAll();
        return inserat;
    }

    public Inserat findById(Integer id){
        Optional<Inserat> genre = inseratRepository.findById(id);
        return genre.orElseThrow(EntityNotFoundException::new);
    }
    public Iterable<User> findUserByInseratId (Integer inseratId){
        return inseratRepository.findAuftraggeberByInseratId(inseratId);
    }
    public Iterable<Inserat> findInserateByUserId(Integer userId){
        return inseratRepository.findInseratsByAuftragnehmer_id(userId);
    }
    public Iterable<Inserat> findInseratByAuftraggeberId(Integer auftraggeberId){
        return inseratRepository.findInserateByAuftraggeber_Id(auftraggeberId);
    }
    public Inserat update(Inserat inserat){
        return inseratRepository.save(inserat);
    }
    public void deleteById(Integer id){
        inseratRepository.deleteById(id);
    }

}
