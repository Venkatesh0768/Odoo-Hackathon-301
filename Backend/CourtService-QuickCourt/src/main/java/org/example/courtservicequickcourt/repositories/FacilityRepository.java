package org.example.courtservicequickcourt.repositories;


import org.example.entityservicequickcourt.models.Facility;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FacilityRepository extends JpaRepository<Facility, String> {
    // Additional query methods can be defined here if needed
}
