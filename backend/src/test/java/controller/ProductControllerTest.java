package controller;

import com.hahn.software.programming.practicals.product.controller.ProductController;
import com.hahn.software.programming.practicals.product.dto.ProductRequest;
import com.hahn.software.programming.practicals.product.dto.ProductResponse;
import com.hahn.software.programming.practicals.product.service.ProductService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.http.ResponseEntity;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

class ProductControllerTest {

    @InjectMocks
    private ProductController controller;

    @Mock
    private ProductService service;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void create_ShouldReturnProductResponse() {
        ProductRequest request = new ProductRequest("Produit 1", "Description du produit", 19.99);
        ProductResponse response = new ProductResponse(1L, "Produit 1", "Description du produit", 19.99);

        when(service.create(request)).thenReturn(response);

        ResponseEntity<ProductResponse> result = controller.create(request);

        assertThat(result.getBody()).isEqualTo(response);
        assertThat(result.getStatusCodeValue()).isEqualTo(200);
        verify(service, times(1)).create(request);
    }

    @Test
    void getAll_ShouldReturnListOfProductResponse() {
        ProductResponse product = new ProductResponse(1L, "Produit 1", "Description", 19.99);
        List<ProductResponse> responseList = List.of(product);

        when(service.getAll()).thenReturn(responseList);

        ResponseEntity<List<ProductResponse>> result = controller.getAll();

        assertThat(result.getBody()).isEqualTo(responseList);
        assertThat(result.getStatusCodeValue()).isEqualTo(200);
        verify(service, times(1)).getAll();
    }

    @Test
    void getById_ShouldReturnProductResponse() {
        Long id = 1L;
        ProductResponse response = new ProductResponse(id, "Produit 1", "Description", 19.99);

        when(service.getById(id)).thenReturn(response);

        ResponseEntity<ProductResponse> result = controller.getById(id);

        assertThat(result.getBody()).isEqualTo(response);
        assertThat(result.getStatusCodeValue()).isEqualTo(200);
        verify(service, times(1)).getById(id);
    }

    @Test
    void update_ShouldReturnUpdatedProductResponse() {
        Long id = 1L;
        ProductRequest request = new ProductRequest("Produit 1 modifié", "Nouvelle description", 29.99);
        ProductResponse response = new ProductResponse(id, "Produit 1 modifié", "Nouvelle description", 29.99);

        when(service.update(id, request)).thenReturn(response);

        ResponseEntity<ProductResponse> result = controller.update(id, request);

        assertThat(result.getBody()).isEqualTo(response);
        assertThat(result.getStatusCodeValue()).isEqualTo(200);
        verify(service, times(1)).update(id, request);
    }

    @Test
    void delete_ShouldReturnNoContent() {
        Long id = 1L;

        ResponseEntity<Void> result = controller.delete(id);

        assertThat(result.getStatusCodeValue()).isEqualTo(204);
        verify(service, times(1)).delete(id);
    }
}
