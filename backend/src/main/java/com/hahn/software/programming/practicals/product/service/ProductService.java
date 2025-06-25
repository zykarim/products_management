package com.hahn.software.programming.practicals.product.service;

import com.hahn.software.programming.practicals.product.dto.ProductRequest;
import com.hahn.software.programming.practicals.product.dto.ProductResponse;

import java.util.List;

public interface ProductService {
    ProductResponse create(ProductRequest request);
    ProductResponse update(Long id, ProductRequest request);
    void delete(Long id);
    ProductResponse getById(Long id);
    List<ProductResponse> getAll();
}
