package com.example.insta_approval_backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.insta_approval_backend.DTO.CustomerResponse;
import com.example.insta_approval_backend.DTO.LoginRequest;
import com.example.insta_approval_backend.DTO.LoginResponse;
import com.example.insta_approval_backend.DTO.RegisterCustomerRequest;
import com.example.insta_approval_backend.service.AuthService;

@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin("*")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // Register Customer
    @PostMapping("/register")
    public ResponseEntity<CustomerResponse> register(@RequestBody RegisterCustomerRequest request) {

        return ResponseEntity.ok(authService.registerCustomer(request));
    }

    // Login
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {

        return ResponseEntity.ok(authService.login(request));
    }
}