package org.example.facilityservicequickcourt.repositories;

import org.example.entityservicequickcourt.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {
    User findByEmail(String email);

    User findUserById(String id);

    User findByPhoneNumber(String phoneNumber);

    boolean existsByEmail(String email);
}
