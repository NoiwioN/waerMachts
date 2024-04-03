package net.ictcampus.waerMachts.model.repositories;

import net.ictcampus.waerMachts.model.models.Ort;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrtRepository extends CrudRepository<Ort, Integer> {
}
