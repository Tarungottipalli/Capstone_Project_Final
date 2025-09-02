package com.example.insta_approval_backend.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;


import com.example.insta_approval_backend.util.LoanStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "loan_applications")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoanApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long applicationId;   // ApplicationID (PK)

    @ManyToOne(optional = false)
    @JoinColumn(name = "customer_id")
    private Customer customer;    // CustomerID (FK)

    @ManyToOne(optional = false)
    @JoinColumn(name = "loan_type_id")
    private LoanType loanType;    // LoanTypeID (FK)

    @Column(nullable = false, precision = 15, scale = 2)
    private BigDecimal loanAmount;

    @Column(nullable = false)
    private LocalDateTime applicationDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private LoanStatus status;    // PENDING / APPROVED / REJECTED

    @Column(length = 1000)
    private String remarks;

    @OneToMany(mappedBy = "loanApplication", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Document> documents;

    @OneToMany(mappedBy = "loanApplication", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<ApprovalHistory> approvalHistory;
}