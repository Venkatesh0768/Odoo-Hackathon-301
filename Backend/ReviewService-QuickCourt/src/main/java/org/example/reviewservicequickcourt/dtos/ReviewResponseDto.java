package org.example.reviewservicequickcourt.dtos;

import lombok.*;
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReviewResponseDto {
    private String id;
    private String userId;
    private String facilityId;
    private Integer rating;
    private String comment;


}

