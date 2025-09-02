package com.example.insta_approval_backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
@Data
@AllArgsConstructor
public class LoginResponse {
    private String token;        // JWT token
    private String role;         // CUSTOMER or ADMIN
    private String adminRole;  
    // LoanOfficer/Manager (null for Customer)
    private Long customerId;
}