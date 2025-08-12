package org.example.matchmakingservicequickcourt.repositories;

import org.example.entityservicequickcourt.models.Court;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourtRepository extends JpaRepository<Court, String> {
}
