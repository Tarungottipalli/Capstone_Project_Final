package com.example.insta_approval_backend.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RegisterCustomerRequest {

    @NotBlank
    private String name;

    @Email
    private String email;  // goes to User entity

    @NotBlank
    private String phone;

    private String address;

    private Integer cibilScore;

    @NotBlank
    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;  // goes to User entity
}
