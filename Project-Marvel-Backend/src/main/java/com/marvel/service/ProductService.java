package com.marvel.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.marvel.entity.Product;
import com.marvel.repository.ProductRepository;

@Service
public class ProductService {

    @Autowired
    private ProductRepository repo;
    
    public Product getProductById(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }
    
    // SEARCH
    public List<Product> searchProducts(String keyword) {
        return repo.findByNameContainingIgnoreCase(keyword);
    }

    // CATEGORY FILTER
    public List<Product> getProductsByCategory(String category) {
        return repo.findByCategoryIgnoreCase(category);
    }

    public List<Product> getAllProducts() {
        return repo.findAll();
    }

    public Product saveProduct(Product product) {
        return repo.save(product);
    }

    public Product updateProduct(Long id, Product newProduct) {
        Product existing = repo.findById(id).orElseThrow();

        existing.setName(newProduct.getName());
        existing.setDescription(newProduct.getDescription());
        existing.setPrice(newProduct.getPrice());
        existing.setCategory(newProduct.getCategory());
        existing.setImageUrl(newProduct.getImageUrl());

        return repo.save(existing);
    }

    public void deleteProduct(Long id) {
        repo.deleteById(id);
    }
}