package com.hahn.software.programming.practicals.product.service.impl;

import com.hahn.software.programming.practicals.product.dto.ProductRequest;
import com.hahn.software.programming.practicals.product.dto.ProductResponse;
import com.hahn.software.programming.practicals.product.entity.Product;
import com.hahn.software.programming.practicals.product.mapper.ProductMapper;
import com.hahn.software.programming.practicals.product.repository.ProductRepository;
import com.hahn.software.programming.practicals.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository repository;
    private final ProductMapper mapper;

    @Override
    public ProductResponse create(ProductRequest request) {
        Product product = mapper.toEntity(request);
        return mapper.toResponse(repository.save(product));
    }

    @Override
    public ProductResponse update(Long id, ProductRequest request) {
        Product product = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        product.setName(request.name());
        product.setDescription(request.description());
        product.setPrice(request.price());
        return mapper.toResponse(repository.save(product));
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }

    @Override
    public ProductResponse getById(Long id) {
        return repository.findById(id)
                .map(mapper::toResponse)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    @Override
    public List<ProductResponse> getAll() {
        return repository.findAll().stream().map(mapper::toResponse).toList();
    }
}