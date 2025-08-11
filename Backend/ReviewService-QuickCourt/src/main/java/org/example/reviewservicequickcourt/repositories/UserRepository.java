package org.example.reviewservicequickcourt.repositories;

import org.example.entityservicequickcourt.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User , String> {
}
