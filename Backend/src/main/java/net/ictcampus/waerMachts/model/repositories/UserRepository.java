package net.ictcampus.waerMachts.model.repositories;

import net.ictcampus.waerMachts.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User,Long> {
}
