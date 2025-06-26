package service;

import com.hahn.software.programming.practicals.product.dto.ProductRequest;
import com.hahn.software.programming.practicals.product.dto.ProductResponse;
import com.hahn.software.programming.practicals.product.entity.Product;
import com.hahn.software.programming.practicals.product.mapper.ProductMapper;
import com.hahn.software.programming.practicals.product.repository.ProductRepository;
import com.hahn.software.programming.practicals.product.service.impl.ProductServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

class ProductServiceImplTest {

    @Mock
    private ProductRepository repository;

    @Mock
    private ProductMapper mapper;

    @InjectMocks
    private ProductServiceImpl service;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void create_ShouldReturnProductResponse() {
        ProductRequest request = new ProductRequest("Name", "Desc", 10.0);
        Product productEntity = new Product();
        Product savedProduct = new Product();
        ProductResponse response = new ProductResponse(1L, "Name", "Desc", 10.0);

        when(mapper.toEntity(request)).thenReturn(productEntity);
        when(repository.save(productEntity)).thenReturn(savedProduct);
        when(mapper.toResponse(savedProduct)).thenReturn(response);

        ProductResponse result = service.create(request);

        assertThat(result).isEqualTo(response);
        verify(mapper).toEntity(request);
        verify(repository).save(productEntity);
        verify(mapper).toResponse(savedProduct);
    }

    @Test
    void update_WhenProductExists_ShouldReturnUpdatedResponse() {
        Long id = 1L;
        ProductRequest request = new ProductRequest("UpdatedName", "UpdatedDesc", 20.0);
        Product existingProduct = new Product();
        Product savedProduct = new Product();
        ProductResponse response = new ProductResponse(id, "UpdatedName", "UpdatedDesc", 20.0);

        when(repository.findById(id)).thenReturn(Optional.of(existingProduct));
        when(repository.save(existingProduct)).thenReturn(savedProduct);
        when(mapper.toResponse(savedProduct)).thenReturn(response);

        ProductResponse result = service.update(id, request);

        assertThat(result).isEqualTo(response);
        assertThat(existingProduct.getName()).isEqualTo("UpdatedName");
        assertThat(existingProduct.getDescription()).isEqualTo("UpdatedDesc");
        assertThat(existingProduct.getPrice()).isEqualTo(20.0);

        verify(repository).findById(id);
        verify(repository).save(existingProduct);
        verify(mapper).toResponse(savedProduct);
    }

    @Test
    void update_WhenProductNotFound_ShouldThrow() {
        Long id = 1L;
        ProductRequest request = new ProductRequest("Name", "Desc", 10.0);

        when(repository.findById(id)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> service.update(id, request))
                .isInstanceOf(RuntimeException.class)
                .hasMessage("Product not found");

        verify(repository).findById(id);
        verifyNoMoreInteractions(repository, mapper);
    }

    @Test
    void delete_ShouldCallRepositoryDeleteById() {
        Long id = 1L;

        service.delete(id);

        verify(repository).deleteById(id);
    }

    @Test
    void getById_WhenProductExists_ShouldReturnResponse() {
        Long id = 1L;
        Product product = new Product();
        ProductResponse response = new ProductResponse(id, "Name", "Desc", 10.0);

        when(repository.findById(id)).thenReturn(Optional.of(product));
        when(mapper.toResponse(product)).thenReturn(response);

        ProductResponse result = service.getById(id);

        assertThat(result).isEqualTo(response);
        verify(repository).findById(id);
        verify(mapper).toResponse(product);
    }

    @Test
    void getById_WhenProductNotFound_ShouldThrow() {
        Long id = 1L;

        when(repository.findById(id)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> service.getById(id))
                .isInstanceOf(RuntimeException.class)
                .hasMessage("Product not found");

        verify(repository).findById(id);
        verifyNoMoreInteractions(repository, mapper);
    }

    @Test
    void getAll_ShouldReturnListOfResponses() {
        Product product = new Product();
        ProductResponse response = new ProductResponse(1L, "Name", "Desc", 10.0);
        List<Product> productList = List.of(product);
        List<ProductResponse> responseList = List.of(response);

        when(repository.findAll()).thenReturn(productList);
        when(mapper.toResponse(product)).thenReturn(response);

        List<ProductResponse> result = service.getAll();

        assertThat(result).isEqualTo(responseList);
        verify(repository).findAll();
        verify(mapper).toResponse(product);
    }
}
