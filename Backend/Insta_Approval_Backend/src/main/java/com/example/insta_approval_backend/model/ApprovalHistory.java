package com.example.insta_approval_backend.model;

import java.time.LocalDateTime;

import com.example.insta_approval_backend.util.ApprovalAction;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "approval_history")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApprovalHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long historyId;   // HistoryID (PK)

    @ManyToOne(optional = false)
    @JoinColumn(name = "application_id")
    private LoanApplication loanApplication; // ApplicationID (FK)

    @ManyToOne(optional = false)
    @JoinColumn(name = "admin_id")
    private Admin admin;      // AdminID (FK)

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ApprovalAction action; // APPROVED / REJECTED

    @Column(nullable = false)
    private LocalDateTime actionDate;

    @Column(length = 1000)
    private String remarks;
}