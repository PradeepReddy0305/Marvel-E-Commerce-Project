package com.marvel.service;

import com.marvel.entity.Cart;
import com.marvel.entity.User;
import com.marvel.entity.Product;
import com.marvel.repository.CartRepository;
import com.marvel.repository.UserRepository;

import jakarta.transaction.Transactional;

import com.marvel.repository.ProductRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService {

	@Autowired
	private CartRepository cartRepo;

	@Autowired
	private UserRepository userRepo;

	@Autowired
	private ProductRepository productRepo;

	public Cart addToCart(Long userId, Long productId, int quantity, String size) {

	    User user = userRepo.findById(userId)
	        .orElseThrow(() -> new RuntimeException("User not found"));

	    Product product = productRepo.findById(productId)
	        .orElseThrow(() -> new RuntimeException("Product not found"));

	    // CHECK EXISTING ITEM
	    Cart existing = cartRepo.findByUserAndProductAndSize(user, product, size);

	    if (existing != null) {
	        existing.setQuantity(existing.getQuantity() + quantity);
	        return cartRepo.save(existing); // UPDATE
	    }

	    // CREATE NEW ITEM
	    Cart cart = new Cart();
	    cart.setUser(user);        
	    cart.setProduct(product);   
	    cart.setQuantity(quantity);
	    cart.setSize(size);

	    return cartRepo.save(cart); // SAVE NEW
	}
	
	// GET USER CART
	public List<Cart> getUserCart(Long userId) {
		return cartRepo.findByUserId(userId);
	}

	// REMOVE ITEM
	public void removeItem(Long cartId) {
		cartRepo.deleteById(cartId);
	}
	
	@Transactional
	public void clearCartByUserId(Long userId) {
		cartRepo.deleteByUserId(userId);
	}
}
