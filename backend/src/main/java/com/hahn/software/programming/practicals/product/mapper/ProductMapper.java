package com.hahn.software.programming.practicals.product.mapper;
import com.hahn.software.programming.practicals.product.dto.ProductRequest;
import com.hahn.software.programming.practicals.product.dto.ProductResponse;
import com.hahn.software.programming.practicals.product.entity.Product;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    Product toEntity(ProductRequest request);
    ProductResponse toResponse(Product product);
}