package org.example.facilityservicequickcourt.repositories;


import org.example.entityservicequickcourt.models.Facility;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface FacilityRepository extends JpaRepository<Facility, String> {

}
