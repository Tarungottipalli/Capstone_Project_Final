package com.example.insta_approval_backend.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.insta_approval_backend.DTO.ApproveRejectRequest;
import com.example.insta_approval_backend.model.Admin;
import com.example.insta_approval_backend.model.ApprovalHistory;
import com.example.insta_approval_backend.model.LoanApplication;
import com.example.insta_approval_backend.repositoriy.AdminRepository;
import com.example.insta_approval_backend.repositoriy.ApprovalHistoryRepository;
import com.example.insta_approval_backend.repositoriy.LoanApplicationRepository;
import com.example.insta_approval_backend.util.ApprovalAction;
import com.example.insta_approval_backend.util.LoanStatus;

@Service
public class AdminService {

    private final LoanApplicationRepository loanRepo;
    private final ApprovalHistoryRepository historyRepo;
    private final AdminRepository adminRepo;
    

    public AdminService(LoanApplicationRepository loanRepo,
                        ApprovalHistoryRepository historyRepo,
                        AdminRepository adminRepo) {
        this.loanRepo = loanRepo;
        this.historyRepo = historyRepo;
        this.adminRepo = adminRepo;
    }
    
    public List<LoanApplication> getPendingApplications() {
        return loanRepo.findByStatus(LoanStatus.PENDING);
    }

    public LoanApplication reviewLoan(Long adminId, ApproveRejectRequest req) {
        Admin admin = adminRepo.findById(adminId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Admin not found"));

        LoanApplication loan = loanRepo.findById(req.getApplicationId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Loan application not found"));

        LoanStatus newStatus;
        ApprovalAction action;
        
        if ("APPROVED".equalsIgnoreCase(req.getAction())) {
            newStatus = LoanStatus.APPROVED;
            action = ApprovalAction.APPROVED;
        } else if ("REJECTED".equalsIgnoreCase(req.getAction())) {
            newStatus = LoanStatus.REJECTED;
            action = ApprovalAction.REJECTED; 
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid action");
        }

        loan.setStatus(newStatus);
        loan.setRemarks(req.getRemarks());
        loanRepo.save(loan);

        ApprovalHistory history = ApprovalHistory.builder()
                .loanApplication(loan)
                .admin(admin)
                .action(action) 
                .remarks(req.getRemarks())
                .actionDate(LocalDateTime.now()) 
                .build();
        historyRepo.save(history);

        return loan;
    }
    
    
    public LoanApplication approveLoan(Long loanId, String remarks) {
        LoanApplication loan = loanRepo.findById(loanId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Loan not found"));

        loan.setStatus(LoanStatus.APPROVED);
        loan.setRemarks(remarks);
        loanRepo.save(loan);

        createApprovalHistory(loan, ApprovalAction.APPROVED, remarks);
        return loan;
    }
    
    public LoanApplication rejectLoan(Long loanId, String remarks) {
        LoanApplication loan = loanRepo.findById(loanId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Loan not found"));

        if (remarks == null || remarks.trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Remarks are required for rejection");
        }

        loan.setStatus(LoanStatus.REJECTED);
        loan.setRemarks(remarks);
        loanRepo.save(loan);

        createApprovalHistory(loan, ApprovalAction.REJECTED, remarks);
        return loan;
    }
    private void createApprovalHistory(LoanApplication loan, ApprovalAction action, String remarks) {
        // You might want to get the current admin from security context
        Admin admin = getCurrentAdmin(); // Implement this method
        
        ApprovalHistory history = ApprovalHistory.builder()
                .loanApplication(loan)
                .admin(admin)
                .action(action)
                .remarks(remarks)
                .actionDate(LocalDateTime.now())
                .build();
        
        historyRepo.save(history);
    }
    
    private Admin getCurrentAdmin() {
        // Implement based on your authentication setup
        // This is a placeholder - you'll need to implement based on your UserDetails
        return adminRepo.findById(1L) // Example: get first admin
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Admin not found"));
    }
}