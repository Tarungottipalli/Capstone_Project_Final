package com.example.insta_approval_backend.DTO;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import lombok.Data;

@Data
public class AdminLoanResponse {
    private Long applicationId;
    private CustomerSummary customer;
    private LoanTypeSummary loanType;
    private BigDecimal loanAmount;
    private LocalDateTime applicationDate;
    private String status;
    private String remarks;

    @Data
    public static class CustomerSummary {
        private Long customerId;
        private String name;
    }

    @Data
    public static class LoanTypeSummary {
        private Long loanTypeId;
        private String name;
    }
}

