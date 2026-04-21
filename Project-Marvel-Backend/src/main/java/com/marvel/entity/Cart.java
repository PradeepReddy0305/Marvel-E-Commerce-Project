package com.marvel.entity;

import jakarta.persistence.*;

@Entity
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // USER RELATION
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    // PRODUCT RELATION
    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    private int quantity;
    private String size;
	public Cart() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Cart(Long id, User user, Product product, int quantity, String size) {
		super();
		this.id = id;
		this.user = user;
		this.product = product;
		this.quantity = quantity;
		this.size = size;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public Product getProduct() {
		return product;
	}
	public void setProduct(Product product) {
		this.product = product;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	public String getSize() {
		return size;
	}
	public void setSize(String size) {
		this.size = size;
	}
	@Override
	public String toString() {
		return "Cart [id=" + id + ", user=" + user + ", product=" + product + ", quantity=" + quantity + ", size="
				+ size + "]";
	}
}