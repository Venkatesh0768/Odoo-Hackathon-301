package org.example.authservicequickcourt.controllers;

import org.example.authservicequickcourt.dtos.LoginRequestDto;
import org.example.authservicequickcourt.dtos.UserRequestDto;
import org.example.authservicequickcourt.dtos.UserResponseDto;
import org.example.authservicequickcourt.services.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")

@CrossOrigin(origins = "http://localhost:5173" , allowCredentials = "true")
public class UserController {

    private final AuthService authService;

    public UserController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/signup")
    public ResponseEntity<UserResponseDto> signUp(@RequestBody  UserRequestDto userRequestDto) {
        UserResponseDto createdUser = authService.signUp(userRequestDto);
        return new ResponseEntity<>(createdUser , HttpStatus.CREATED);
    }


    @PostMapping("/login")
    public ResponseEntity<UserResponseDto> loginUser(@RequestBody LoginRequestDto loginRequestDto) {
        UserResponseDto userResponseDto = authService.loginUser(loginRequestDto);
        return new ResponseEntity<>(userResponseDto, HttpStatus.OK);
    }


}
