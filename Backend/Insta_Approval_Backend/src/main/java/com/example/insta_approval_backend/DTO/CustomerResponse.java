package com.example.insta_approval_backend.DTO;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class CustomerResponse {
    private Long customerId;
    private String name;
    private String email;
    private String phone;
    private String address;
    private Integer cibilScore;
    private LocalDateTime registrationDate;
}
