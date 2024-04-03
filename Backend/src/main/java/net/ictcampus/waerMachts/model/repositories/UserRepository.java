package net.ictcampus.waerMachts.model.repositories;

import net.ictcampus.waerMachts.model.models.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User,Integer> {
    Optional<User> findUserByEmail (String email);
}
