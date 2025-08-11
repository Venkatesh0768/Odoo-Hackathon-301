package org.example.courtservicequickcourt.repositories;

import org.example.entityservicequickcourt.models.Court;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourtRepository extends JpaRepository<Court, String> {
    // Additional query methods can be defined here if needed
}
