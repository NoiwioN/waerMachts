package net.ictcampus.waerMachts.model.repositories;

import net.ictcampus.waerMachts.model.models.Inserat;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface InseratRepository extends CrudRepository<Inserat, Integer> {
    @Query("SELECT i from Inserat i JOIN i.auftragnehmer_id u WHERE u.id_user=:userId")
    Iterable<Inserat> findInseratsByAuftragnehmer_id(@Param(value = "userId") Integer userId);
}
