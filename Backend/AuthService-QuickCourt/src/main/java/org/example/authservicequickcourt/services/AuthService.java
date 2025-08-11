package org.example.authservicequickcourt.services;

import org.example.authservicequickcourt.dtos.UserRequestDto;
import org.example.authservicequickcourt.dtos.UserResponseDto;
import org.example.authservicequickcourt.repositories.UserRepository;
import org.example.entityservicequickcourt.enums.UserRole;
import org.example.entityservicequickcourt.models.User;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.Optional;

@Service
public class AuthService {

    private UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void registerUser(UserRequestDto userRequestDto) {
        Optional<User> isExisted = userRepository.findByEmail(userRequestDto.getEmail());
        if (!isExisted.isPresent()) {
            User user = new User();
            user.setFirstName(userRequestDto.getFirstName());
            user.setLastName(userRequestDto.getLastName());
            user.setEmail(userRequestDto.getEmail());
            user.setPassword(userRequestDto.getPassword());
            user.setPhoneNumber(userRequestDto.getPhoneNumber());
            user.setRole(UserRole.valueOf(userRequestDto.getRole()));
            userRepository.save(user);
        } else {
            throw new RuntimeException("User already exists with email: " + userRequestDto.getEmail());
        }
    }

    public UserResponseDto loginUser(String email, String password) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (user.getPassword().equals(password)) {
                UserResponseDto userResponseDto = new UserResponseDto();
                userResponseDto.setFirstName(user.getFirstName());
                userResponseDto.setLastName(user.getLastName());
                userResponseDto.setEmail(user.getEmail());
                userResponseDto.setPhoneNumber(user.getPhoneNumber());
                userResponseDto.setRole(user.getRole().name());
                return userResponseDto;
            } else {
                throw new RuntimeException("Invalid password for email: " + email);
            }
        } else {
            throw new RuntimeException("User not found with email: " + email);
        }
    }


    public boolean isEmailExists(String email) {
        return userRepository.existsByEmail(email);
    }

    public Optional<User> findById(String id) {
        return userRepository.findById(id);
    }



}
