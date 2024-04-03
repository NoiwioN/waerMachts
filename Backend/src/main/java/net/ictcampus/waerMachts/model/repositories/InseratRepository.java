package net.ictcampus.waerMachts.model.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InseratRepository extends CrudRepository<Inserat, Long> {
}
