package net.ictcampus.waerMachts.controller.services;

import net.ictcampus.waerMachts.model.models.Ort;
import net.ictcampus.waerMachts.model.repositories.OrtRepository;
import org.springframework.stereotype.Service;

@Service
public class OrtService {
    private final OrtRepository ortRepository;

    public OrtService(OrtRepository ortRepository) {
        this.ortRepository = ortRepository;
    }

   public Ort findOrtByUserId(Integer userId){
        return ortRepository.findOrtByUserId(userId);
    }
}
