package org.example.reviewservicequickcourt.repositories;

import jdk.jfr.Registered;
import org.example.entityservicequickcourt.models.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository  extends JpaRepository<Review, String> {
}
