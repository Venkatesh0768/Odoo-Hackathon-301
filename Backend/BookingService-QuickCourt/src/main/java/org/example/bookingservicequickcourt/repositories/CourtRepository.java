package org.example.bookingservicequickcourt.repositories;

import org.example.entityservicequickcourt.models.Court;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourtRepository extends JpaRepository<Court , String> {
    // Additional query methods can be defined here if needed
    // For example, to find courts by location or type, you can add methods like:
    // List<Court> findByLocation(String location);

}
