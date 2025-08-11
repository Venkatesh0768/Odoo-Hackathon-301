package org.example.entityservicequickcourt.models;

import jakarta.persistence.*;
import lombok.*;
import org.example.entityservicequickcourt.enums.UserRole;

import java.util.List;

@Entity
@Table(name = "users")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class User extends BaseModel {


    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String phoneNumber;
    private String profilePictureUrl;

    @Enumerated(EnumType.STRING)
    private UserRole role;

    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL)
    private List<Facility> ownedFacilities;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Booking> bookings;

    @OneToMany(mappedBy = "creator", cascade = CascadeType.ALL)
    private List<Match> createdMatches;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Review> reviews;
}