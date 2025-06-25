package com.hahn.software.programming.practicals.product.dto;

import jakarta.validation.constraints.*;

public record ProductRequest(
        @NotBlank
        String name,
        String description,
        @NotNull
        @Positive
        Double price
) {}