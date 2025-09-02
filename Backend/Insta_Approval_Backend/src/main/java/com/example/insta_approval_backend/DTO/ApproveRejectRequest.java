package com.example.insta_approval_backend.DTO;

import lombok.Data;

@Data
public class ApproveRejectRequest {
	
    private Long applicationId;  // loan application ID
    private String action;       // APPROVED or REJECTED
    private String remarks;      // optional remarks
}
