package org.example.userservicequickcourt.services;

import org.example.entityservicequickcourt.models.User;
import org.example.userservicequickcourt.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServices {

    private UserRepository userRepository;
    public UserServices(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(String id) {
        return userRepository.findUserById(id);
    }

    public Optional<User> updateUser(String id, User user) {
        Optional<User> existingUser = userRepository.findUserById(id);
        if (existingUser.isPresent()) {
            User updatedUser = existingUser.get();
            updatedUser.setFirstName(user.getFirstName());
            updatedUser.setLastName(user.getLastName());
            updatedUser.setEmail(user.getEmail());
            updatedUser.setPhoneNumber(user.getPhoneNumber());
            updatedUser.setRole(user.getRole());
            return Optional.of(userRepository.save(updatedUser));
        }
        return Optional.empty();
    }

    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }

}
