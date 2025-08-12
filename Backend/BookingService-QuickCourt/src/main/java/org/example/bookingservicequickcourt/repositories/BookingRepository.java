package org.example.bookingservicequickcourt.repositories;

import org.example.entityservicequickcourt.models.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking ,String> {

     List<Booking> findByUserId(String userId);
     List<Booking> findByCourtId(String courtId);
}
