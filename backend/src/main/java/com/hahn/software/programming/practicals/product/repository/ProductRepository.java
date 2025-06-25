package com.hahn.software.programming.practicals.product.repository;
import com.hahn.software.programming.practicals.product.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}