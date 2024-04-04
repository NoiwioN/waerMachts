package net.ictcampus.waerMachts.model.repositories;

import net.ictcampus.waerMachts.model.models.Ort;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface OrtRepository extends CrudRepository<Ort, Integer> {
    @Query("SELECT o FROM User u JOIN u.ort o WHERE u.id_user=:userId")
    Ort findOrtByUserId (@Param(value = "userId") Integer userId);
}
