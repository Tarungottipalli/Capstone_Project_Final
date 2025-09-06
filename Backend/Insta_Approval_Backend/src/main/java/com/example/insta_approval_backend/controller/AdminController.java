package com.example.insta_approval_backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.insta_approval_backend.DTO.AdminLoanResponse;
import com.example.insta_approval_backend.DTO.ApproveRejectRequest;
import com.example.insta_approval_backend.DTO.LoanResponse;
import com.example.insta_approval_backend.model.LoanApplication;
import com.example.insta_approval_backend.service.AdminService;

@RestController
@RequestMapping("/api/v1/admin")
@PreAuthorize("hasRole('ADMIN')")
@CrossOrigin("*")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    // Approve/Reject Loan
    @PostMapping("/{adminId}/review")
    public ResponseEntity<LoanResponse> reviewLoan(
            @PathVariable Long adminId,
            @RequestBody ApproveRejectRequest request) {

        LoanApplication loan = adminService.reviewLoan(adminId, request);

        LoanResponse resp = new LoanResponse();
        resp.setApplicationId(loan.getApplicationId());
        resp.setCustomerId(loan.getCustomer().getCustomerId());
        resp.setLoanTypeId(loan.getLoanType().getLoanTypeId());
        resp.setLoanAmount(loan.getLoanAmount());

        resp.setApplicationDate(loan.getApplicationDate());
        resp.setStatus(loan.getStatus());
        resp.setRemarks(loan.getRemarks());

     

    }
    @GetMapping("/loans/pending")
    public ResponseEntity<List<AdminLoanResponse>> getPendingLoans() {
        List<LoanApplication> pendingLoans = adminService.getPendingApplications();

        List<AdminLoanResponse> responses = pendingLoans.stream().map(loan -> {
            AdminLoanResponse resp = new AdminLoanResponse();
            resp.setApplicationId(loan.getApplicationId());

            
            AdminLoanResponse.CustomerSummary cust = new AdminLoanResponse.CustomerSummary();
            cust.setCustomerId(loan.getCustomer().getCustomerId());
            cust.setName(loan.getCustomer().getName());

            resp.setCustomer(cust);

            
            Ad minLoanResponse.LoanTypeSummary type = new AdminLoanResponse.LoanTypeSummary();
            type.setLoanTypeId(loan.getLoanType().getLoanTypeId());
            
            resp.setLoanType(type);

            resp.setLoanAmount(loan.getLoanAmount());
            resp.setApplicationDate(loan.getApplicationDate());
            resp.setStatus(loan.getStatus().name());

            resp.setRemarks(loan.getRemarks());

            return resp;
     

    }

    
    @PutMapping("/loans/approve/{loanId}")

            @PathVariable Long loanId,
            @RequestBody(required = false) String remarks) {
     

    }

   
    @PutMapping("/loans/reject/{loanId}")

            @PathVariable Long loanId,
            @RequestBody String remarks) {
     

    }
    
    
    private LoanResponse mapToLoanResponse(LoanApplication loan) {
        LoanResponse resp = new LoanResponse();
        resp.setApplicationId(loan.getApplicationId());
        resp.setCustomerId(loan.getCustomer().getCustomerId());
        resp.setLoanTypeId(loan.getLoanType().getLoanTypeId());
        resp.setLoanAmount(loan.getLoanAmount());
        resp.setApplicationDate(loan.getApplicationDate());
        resp.setStatus(loan.getStatus());
        resp.setRemarks(loan.getRemarks());
        return resp;
    }
}
