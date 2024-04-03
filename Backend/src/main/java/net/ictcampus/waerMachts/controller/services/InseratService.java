package net.ictcampus.waerMachts.controller.services;

import net.ictcampus.waerMachts.model.models.Inserat;
import net.ictcampus.waerMachts.model.repositories.InseratRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InseratService {
    private final InseratRepository inseratRepository;
    @Autowired
    public InseratService(InseratRepository inseratRepository) {
        this.inseratRepository = inseratRepository;
    }

    public Iterable<Inserat> findAll(){
        Iterable<Inserat> inserat = inseratRepository.findAll();
        return inserat;
    }
}
