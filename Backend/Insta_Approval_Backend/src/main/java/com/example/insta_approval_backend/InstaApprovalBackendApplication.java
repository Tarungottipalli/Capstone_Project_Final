package com.example.insta_approval_backend;

import java.util.List;
import java.util.Optional;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.example.insta_approval_backend.model.Admin;
import com.example.insta_approval_backend.model.LoanType;
import com.example.insta_approval_backend.model.User;
import com.example.insta_approval_backend.repositoriy.AdminRepository;
import com.example.insta_approval_backend.repositoriy.LoanTypeRepository;
import com.example.insta_approval_backend.repositoriy.UserRepository;
import com.example.insta_approval_backend.util.AdminRole;
import com.example.insta_approval_backend.util.Role;

@SpringBootApplication
public class InstaApprovalBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(InstaApprovalBackendApplication.class, args);
	}
	
	
	// InstaApprovalBackendApplication.java
	@Bean
	CommandLineRunner createDefaultAdmin(UserRepository userRepository,
	                                   AdminRepository adminRepository,
	                                   PasswordEncoder passwordEncoder) {
	    return args -> {
	        // Check if admin user exists
	        Optional<User> existingAdminUser = userRepository.findByEmail("tarun@bank.com");
	        
	        if (existingAdminUser.isPresent()) {
	            // Check if admin record exists
	            User adminUser = existingAdminUser.get();
	            Optional<Admin> existingAdmin = adminRepository.findByUser(adminUser);
	            
	            if (existingAdmin.isEmpty()) {
	                // Create missing admin record
	                Admin admin = Admin.builder()
	                    .name("Bank Administrator")
	                    .email("tarun@bank.com")
	                    .role(AdminRole.MANAGER)
	                    .password(adminUser.getPassword())
	                    .user(adminUser)
	                    .build();
	                adminRepository.save(admin);
	                System.out.println("Created missing admin record for: admin@bank.com");
	            }
	        } else {
	            // Create both user and admin records
	            User adminUser = User.builder()
	                .email("tarun@bank.com")
	                .password(passwordEncoder.encode("tarun123"))
	                .role(Role.ADMIN)
	                .build();
	            adminUser = userRepository.save(adminUser);

	            Admin admin = Admin.builder()
	                .name("Bank Administrator")
	                .email("tarun@bank.com")
	                .role(AdminRole.MANAGER)
	                .password(adminUser.getPassword())
	                .user(adminUser)
	                .build();
	            adminRepository.save(admin);
	            System.out.println("Created admin user: tarun@bank.com / tarun123");
	        }
	    };
	}
	
	// InstaApprovalBackendApplication.java
	@Bean
	CommandLineRunner initLoanTypes(LoanTypeRepository loanTypeRepository) {
	    return args -> {
	        // Check if loan types already exist
	        if (loanTypeRepository.count() == 0) {
	            // Create predefined loan types
	            LoanType interestFree = LoanType.builder()
	                    .typeName("INTEREST_FREE_CAR_LOAN")
	                    .description("Interest-Free Car Loan")
	                    .build();

	            LoanType zeroFirstYear = LoanType.builder()
	                    .typeName("CAR_LOAN_ZERO_FIRST_YEAR")
	                    .description("Car Loan with 0% interest for the first year")
	                    .build();

	            loanTypeRepository.saveAll(List.of(interestFree, zeroFirstYear));
	            System.out.println("Loan types initialized successfully");
	        }
	    };
	}
}
