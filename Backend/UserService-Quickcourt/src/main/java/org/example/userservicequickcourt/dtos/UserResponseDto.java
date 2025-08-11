package org.example.userservicequickcourt.dtos;


import lombok.*;
import org.example.entityservicequickcourt.models.Booking;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserResponseDto {
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String email;
    private String password;
    private String role;
    private String profilePictureUrl;
    private Booking booking;
    private Math match;

}
