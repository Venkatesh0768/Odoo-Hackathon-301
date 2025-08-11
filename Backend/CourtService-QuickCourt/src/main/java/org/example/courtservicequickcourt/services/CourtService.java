package org.example.courtservicequickcourt.services;

import org.example.courtservicequickcourt.dtos.CourtRequestDto;
import org.example.courtservicequickcourt.dtos.CourtResponseDto;
import org.example.courtservicequickcourt.repositories.CourtRepository;
import org.example.courtservicequickcourt.repositories.FacilityRepository;
import org.example.entityservicequickcourt.enums.SportType;
import org.example.entityservicequickcourt.models.Availability;
import org.example.entityservicequickcourt.models.Booking;
import org.example.entityservicequickcourt.models.Court;
import org.example.entityservicequickcourt.models.Match;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CourtService  {

    @Autowired
    private CourtRepository courtRepository;

    @Autowired
    private FacilityRepository facilityRepository;


    public CourtResponseDto createCourt(CourtRequestDto dto) {
        Court court = new Court();
        court.setFacility(facilityRepository.findById(dto.getFacilityId())
                .orElseThrow(() -> new RuntimeException("Facility not found")));
        court.setName(dto.getName());
        court.setSportType(SportType.valueOf(dto.getSportType()));
        court.setPricePerHour(dto.getPricePerHour());
        court.setOperatingHours(dto.getOperatingHours());

        Court saved = courtRepository.save(court);
        return mapToResponseDto(saved);
    }


    public CourtResponseDto getCourtById(String id) {
        Court court = courtRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Court not found"));
        return mapToResponseDto(court);
    }


    public List<CourtResponseDto> getAllCourts() {
        return courtRepository.findAll()
                .stream()
                .map(this::mapToResponseDto)
                .collect(Collectors.toList());
    }


    public CourtResponseDto updateCourt(String id, CourtRequestDto dto) {
        Court court = courtRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Court not found"));

        court.setFacility(facilityRepository.findById(dto.getFacilityId())
                .orElseThrow(() -> new RuntimeException("Facility not found")));
        court.setName(dto.getName());
        court.setSportType(SportType.valueOf(dto.getSportType()));
        court.setPricePerHour(dto.getPricePerHour());
        court.setOperatingHours(dto.getOperatingHours());

        Court updated = courtRepository.save(court);
        return mapToResponseDto(updated);
    }


    public void deleteCourt(String id) {
        courtRepository.deleteById(id);
    }

    private CourtResponseDto mapToResponseDto(Court court) {
        CourtResponseDto dto = new CourtResponseDto();
        dto.setId(court.getId());
        dto.setFacilityId(court.getFacility().getId());
        dto.setName(court.getName());
        dto.setSportType(court.getSportType().name());
        dto.setPricePerHour(court.getPricePerHour());
        dto.setOperatingHours(court.getOperatingHours());

        dto.setAvailabilityIds(court.getAvailabilities() != null ?
                court.getAvailabilities().stream().map(Availability::getId).collect(Collectors.toList()) : null);

        dto.setBookingIds(court.getBookings() != null ?
                court.getBookings().stream().map(Booking::getId).collect(Collectors.toList()) : null);

        dto.setMatchIds(court.getMatches() != null ?
                court.getMatches().stream().map(Match::getId).collect(Collectors.toList()) : null);

        return dto;
    }
}
