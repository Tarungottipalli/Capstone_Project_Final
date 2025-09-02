package com.example.insta_approval_backend.repositoriy;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.insta_approval_backend.model.Document;

@Repository
public interface DocumentRepository extends JpaRepository<Document, Long> {
	 List<Document> findByLoanApplication_ApplicationId(Long loanId);
}