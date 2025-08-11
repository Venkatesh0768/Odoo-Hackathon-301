package org.example.authservicequickcourt.services;

import org.example.authservicequickcourt.dtos.LoginRequestDto;
import org.example.authservicequickcourt.dtos.UserRequestDto;
import org.example.authservicequickcourt.dtos.UserResponseDto;
import org.example.authservicequickcourt.repositories.UserRepository;
import org.example.entityservicequickcourt.enums.UserRole;
import org.example.entityservicequickcourt.models.User;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserResponseDto signUp(UserRequestDto userRequestDto) {
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


            UserResponseDto userResponseDto = new UserResponseDto();
            userResponseDto.setFirstName(user.getFirstName());
            userResponseDto.setLastName(user.getLastName());
            userResponseDto.setEmail(user.getEmail());
            userResponseDto.setPhoneNumber(user.getPhoneNumber());
            userResponseDto.setRole(user.getRole().name());
            return userResponseDto;
        } else {
            throw new RuntimeException("User already exists with email: " + userRequestDto.getEmail());
        }
    }

    public UserResponseDto loginUser(LoginRequestDto loginRequestDto) {
        Optional<User> user = userRepository.findByEmail(loginRequestDto.getEmail());
        if (user.isPresent()) {
            User foundUser = user.get();
            if (foundUser.getPassword().equals(loginRequestDto.getPassword())) {
                UserResponseDto userResponseDto = new UserResponseDto();
                userResponseDto.setFirstName(foundUser.getFirstName());
                userResponseDto.setLastName(foundUser.getLastName());
                userResponseDto.setEmail(foundUser.getEmail());
                userResponseDto.setPhoneNumber(foundUser.getPhoneNumber());
                userResponseDto.setRole(foundUser.getRole().name());
                return userResponseDto;
            } else {
                throw new RuntimeException("Invalid password for email: " + loginRequestDto.getEmail());
            }
        } else {
            throw new RuntimeException("User not found with email: " + loginRequestDto.getEmail());
        }

    }


    public boolean isEmailExists(String email) {
        return userRepository.existsByEmail(email);
    }

    public Optional<User> findById(String id) {
        return userRepository.findById(id);
    }





}
