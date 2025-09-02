package com.example.insta_approval_backend.repositoriy;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.insta_approval_backend.model.LoanType;

@Repository
public interface LoanTypeRepository extends JpaRepository<LoanType, Long> {
}