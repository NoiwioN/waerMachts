package net.ictcampus.waerMachts.controller.services;

import net.ictcampus.waerMachts.model.models.Inserat;
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

    public void signUp(Inserat inserat){
        inseratRepository.save(inserat);
    }

    public Iterable<Inserat> findAll(){
        Iterable<Inserat> inserat = inseratRepository.findAll();
        return inserat;
    }

    public Inserat findById(Integer id){
        Optional<Inserat> genre = inseratRepository.findById(id);
        return genre.orElseThrow(EntityNotFoundException::new);
    }
    public void update(Inserat inserat){
        inseratRepository.save(inserat);
    }
    public void deleteById(Integer id){
        inseratRepository.deleteById(id);
    }

}
