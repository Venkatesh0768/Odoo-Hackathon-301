package org.example.reviewservicequickcourt.repositories;

import org.example.entityservicequickcourt.models.Facility;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FacilityRepository extends JpaRepository<Facility, String> {


    // Additional query methods can be defined here if needed
    // For example, to find facilities by name or location, etc.

    // Optional<Facility> findByName(String name);
    // List<Facility> findByLocation(String location);
    // List<Facility> findByType(String type);
    // List<Facility> findByRatingGreaterThanEqual(double rating);
}
