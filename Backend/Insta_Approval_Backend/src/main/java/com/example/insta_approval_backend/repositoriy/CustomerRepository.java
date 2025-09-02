package com.example.insta_approval_backend.repositoriy;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.insta_approval_backend.model.Customer;
import com.example.insta_approval_backend.model.User;
@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
	    Optional<Customer> findByEmail(String email);
	    Optional<Customer> findByUser(User user);

	    boolean existsByEmail(String email);
	}