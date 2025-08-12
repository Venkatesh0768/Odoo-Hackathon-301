package org.example.bookingservicequickcourt.services;

import org.example.bookingservicequickcourt.dtos.BookingRequestDto;
import org.example.bookingservicequickcourt.dtos.BookingResponseDto;
import org.example.bookingservicequickcourt.repositories.BookingRepository;
import org.example.bookingservicequickcourt.repositories.CourtRepository;
import org.example.bookingservicequickcourt.repositories.UserRepository;
import org.example.entityservicequickcourt.enums.BookingStatus;
import org.example.entityservicequickcourt.enums.PaymentStatus;
import org.example.entityservicequickcourt.models.Booking;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookingService {


    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CourtRepository courtRepository;


    public BookingResponseDto createBooking(BookingRequestDto dto) {
        Booking booking = new Booking();
        booking.setUser(userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found")));
        booking.setCourt(courtRepository.findById(dto.getCourtId())
                .orElseThrow(() -> new RuntimeException("Court not found")));
        booking.setDate(dto.getDate());
        booking.setStartTime(dto.getStartTime());
        booking.setEndTime(dto.getEndTime());
        booking.setDuration(dto.getDuration());
        booking.setStatus(BookingStatus.valueOf(dto.getStatus()));
        booking.setPaymentStatus(PaymentStatus.valueOf(dto.getPaymentStatus()));

        Booking saved = bookingRepository.save(booking);
        return mapToResponseDto(saved);
    }

    public BookingResponseDto getBookingById(String id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        return mapToResponseDto(booking);
    }


    public List<BookingResponseDto> getAllBookings() {
        return bookingRepository.findAll()
                .stream()
                .map(this::mapToResponseDto)
                .collect(Collectors.toList());
    }


    public BookingResponseDto updateBooking(String id, BookingRequestDto dto) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        booking.setUser(userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found")));
        booking.setCourt(courtRepository.findById(dto.getCourtId())
                .orElseThrow(() -> new RuntimeException("Court not found")));
        booking.setDate(dto.getDate());
        booking.setStartTime(dto.getStartTime());
        booking.setEndTime(dto.getEndTime());
        booking.setDuration(dto.getDuration());
        booking.setStatus(BookingStatus.valueOf(dto.getStatus()));
        booking.setPaymentStatus(PaymentStatus.valueOf(dto.getPaymentStatus()));

        Booking updated = bookingRepository.save(booking);
        return mapToResponseDto(updated);
    }


    public void deleteBooking(String id) {
        bookingRepository.deleteById(id);
    }

    private BookingResponseDto mapToResponseDto(Booking booking) {
        BookingResponseDto dto = new BookingResponseDto();
        dto.setId(booking.getId());
        dto.setUserId(String.valueOf(booking.getUser()));
        dto.setCourtId(String.valueOf(booking.getCourt()));
        dto.setDate(booking.getDate());
        dto.setStartTime(booking.getStartTime());
        dto.setEndTime(booking.getEndTime());
        dto.setDuration(booking.getDuration());
        dto.setStatus(booking.getStatus().name());
        dto.setPaymentStatus(booking.getPaymentStatus().name());
        return dto;
    }
}
