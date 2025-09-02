package com.example.insta_approval_backend.repositoriy;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.insta_approval_backend.model.LoanApplication;
import com.example.insta_approval_backend.util.LoanStatus;

@Repository
public interface LoanApplicationRepository extends JpaRepository<LoanApplication, Long> {
    List<LoanApplication> findByStatus(LoanStatus status);

    List<LoanApplication> findByCustomerCustomerId(Long customerId);
}