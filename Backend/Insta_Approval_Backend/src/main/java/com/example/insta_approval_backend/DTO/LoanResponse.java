package com.example.insta_approval_backend.DTO;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.example.insta_approval_backend.util.LoanStatus;

import lombok.Data;

@Data
public class LoanResponse {
    private Long applicationId;
    private Long customerId;
    private Long loanTypeId;
    private String loanTypeName;   
    private BigDecimal loanAmount;
    private LocalDateTime applicationDate;
    private LoanStatus status;
    private String remarks;
}
