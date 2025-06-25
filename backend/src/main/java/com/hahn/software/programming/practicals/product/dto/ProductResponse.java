package com.hahn.software.programming.practicals.product.dto;

public record ProductResponse(
        Long id,
        String name,
        String description,
        Double price
) {}