package com.example.insta_approval_backend.DTO;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DocumentUploadResponse {
    private Long documentId;
    private String fileName;
    private String fileType;
    private String documentType;
    private Long loanApplicationId;
    private LocalDateTime uploadDate;
}
