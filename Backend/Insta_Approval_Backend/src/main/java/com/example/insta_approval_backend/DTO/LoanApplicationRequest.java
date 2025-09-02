package com.example.insta_approval_backend.DTO;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoanApplicationRequest {
    private Long loanTypeId;
    private BigDecimal loanAmount;
    private String remarks;
}
