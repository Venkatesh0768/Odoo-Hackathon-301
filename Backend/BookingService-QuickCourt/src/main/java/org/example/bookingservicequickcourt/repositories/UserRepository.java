package org.example.bookingservicequickcourt.repositories;

import org.example.entityservicequickcourt.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User , String> {

    // Method to find a user by email
    Optional<User> findByEmail(String email);

    // Method to find a user by ID
    Optional<User> findUserById(String id);

    // Method to check if a user exists by email
    boolean existsByEmail(String email);

    // Method to find a user by phone number
    Optional<User> findByPhoneNumber(String phoneNumber);
}
