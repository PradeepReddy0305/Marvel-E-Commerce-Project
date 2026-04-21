package com.marvel.controller;

import com.marvel.entity.Cart;
import com.marvel.service.CartService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin
public class CartController {

    @Autowired
    private CartService service;

    // ADD TO CART
    @PostMapping("/add")
    public Cart addToCart(@RequestBody Map<String, Object> data) {

        Long userId = Long.valueOf(data.get("userId").toString());
        Long productId = Long.valueOf(data.get("productId").toString());
        int quantity = Integer.parseInt(data.get("quantity").toString());
        String size = data.get("size") != null ? data.get("size").toString() : null;

        return service.addToCart(userId, productId, quantity, size);
    }

    // GET CART
    @GetMapping("/{userId}")
    public List<Cart> getCart(@PathVariable Long userId) {
        return service.getUserCart(userId);
    }

    // DELETE ITEM
    @DeleteMapping("/{id}")
    public void deleteItem(@PathVariable Long id) {
        service.removeItem(id);
    }
    
    // clear cart
    @DeleteMapping("/clear/{userId}")
    public ResponseEntity<String> clearCart(@PathVariable Long userId) {
        service.clearCartByUserId(userId);
        return ResponseEntity.ok("Cart cleared for user ID: " + userId);
    }
}