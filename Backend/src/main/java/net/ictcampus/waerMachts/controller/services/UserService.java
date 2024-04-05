package net.ictcampus.waerMachts.controller.services;

import net.ictcampus.waerMachts.model.models.User;
import net.ictcampus.waerMachts.model.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }
    public Iterable<User> findAll(){
        return userRepository.findAll();
    }
   public User findById(Integer id){
        Optional<User> user=userRepository.findById(id);
        return user.orElseThrow(EntityNotFoundException::new);
    }
    public User findByEmail(String email){
        Optional<User> user = userRepository.findUserByEmail(email);
        return user.orElseThrow(EntityNotFoundException::new);
    }
    public User findByName(String name){
        User user  = userRepository.findUserByUsername(name);
        return user;
    }
    public void update (User user){
        Iterable<User> users = findAll();
        for (User u : users) {
            if (u.getId_user().equals(user.getId_user())) {
                user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
                userRepository.save(user);
                return;
            }
        }
        throw new RuntimeException("User doesn't exist");
    }
    public void signUp(User user) {
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }
    public void deleteById(Integer id) {
        userRepository.deleteById(id);
    }

}
