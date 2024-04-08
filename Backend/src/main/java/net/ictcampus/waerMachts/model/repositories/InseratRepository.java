package net.ictcampus.waerMachts.model.repositories;

import net.ictcampus.waerMachts.model.models.Inserat;
import net.ictcampus.waerMachts.model.models.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface InseratRepository extends CrudRepository<Inserat, Integer> {
    @Query("SELECT i from Inserat i JOIN i.auftragnehmer_id u WHERE u.id_user=:userId")
    Iterable<Inserat> findInseratsByAuftragnehmer_id(@Param(value = "userId") Integer userId);
    @Query("SELECT u from Inserat  i join  i.auftragnehmer_id u WHERE i.id_inserat=:inserat_id")
    Iterable<User> findAuftraggeberByInseratId(@Param(value = "inserat_id")Integer inserat_id);
}
