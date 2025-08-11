package org.example.facilityservicequickcourt.controllers;

import org.example.facilityservicequickcourt.dtos.CreateFacilityRequestDto;
import org.example.facilityservicequickcourt.dtos.FacilityResponseDto;
import org.example.facilityservicequickcourt.dtos.UpdateFacilityRequestDto;
import org.example.facilityservicequickcourt.services.FacilityService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/facilities")
public class FacilityController {

    private final FacilityService facilityService;

    public FacilityController(FacilityService facilityService) {
        this.facilityService = facilityService;
    }

    @PostMapping
    public ResponseEntity<FacilityResponseDto> createFacility(@RequestBody CreateFacilityRequestDto requestDto) {
        FacilityResponseDto createdFacility = facilityService.createFacility(requestDto);
        return new ResponseEntity<>(createdFacility, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<FacilityResponseDto>> getAllFacilities() {
        List<FacilityResponseDto> facilities = facilityService.getAllFacilities();
        return ResponseEntity.ok(facilities);
    }

    @GetMapping("/{facilityId}")
    public ResponseEntity<FacilityResponseDto> getFacilityById(@PathVariable String facilityId) {
        FacilityResponseDto facility = facilityService.getFacilityById(facilityId);
        return ResponseEntity.ok(facility);
    }

    @PutMapping("/{facilityId}")
    public ResponseEntity<FacilityResponseDto> updateFacility(@PathVariable String facilityId,@RequestBody UpdateFacilityRequestDto requestDto) {
        FacilityResponseDto updatedFacility = facilityService.updateFacility(facilityId, requestDto);
        return ResponseEntity.ok(updatedFacility);
    }


}