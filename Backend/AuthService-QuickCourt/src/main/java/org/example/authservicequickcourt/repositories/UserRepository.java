package org.example.authservicequickcourt.repositories;

import org.example.entityservicequickcourt.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;
import java.util.function.Supplier;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByEmail(String email);

    Optional<User> findUserById(String id);

    Supplier<? extends User> findByPhoneNumber(String phoneNumber);

    boolean existsByEmail(String email);
}
