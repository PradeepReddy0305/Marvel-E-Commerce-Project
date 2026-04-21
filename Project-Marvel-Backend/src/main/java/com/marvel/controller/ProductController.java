package com.marvel.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.marvel.entity.Product;
import com.marvel.service.ProductService;

@RestController
@RequestMapping("/api/products")
@CrossOrigin
public class ProductController {

    @Autowired
    private ProductService service;

    // GET ALL
    @GetMapping
    public List<Product> getAll() {
        return service.getAllProducts();
    }
    
    
    // GET PRODUCT BY ID
    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        return service.getProductById(id);
    }
    
    // SEARCH PRODUCTS
    @GetMapping("/search/{keyword}")
    public List<Product> searchProducts(@PathVariable String keyword) {
        return service.searchProducts(keyword);
    }

    // FILTER BY CATEGORY
    @GetMapping("/category/{category}")
    public List<Product> getByCategory(@PathVariable String category) {
        return service.getProductsByCategory(category);
    }

    // ADD PRODUCT
    @PostMapping("/add")
    public Product addProduct(@RequestBody Product product) {
        return service.saveProduct(product);
    }

    // UPDATE PRODUCT
    @PutMapping("/update/{id}")
    public Product updateProduct(@PathVariable Long id, @RequestBody Product product) {
        return service.updateProduct(id, product);
    }

    // DELETE PRODUCT
    @DeleteMapping("/delete/{id}")
    public String deleteProduct(@PathVariable Long id) {
        service.deleteProduct(id);
        return "Deleted Successfully";
    }
}