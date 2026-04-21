package com.marvel.entity;

import jakarta.persistence.*;


@Entity
@Table(name = "products")
public class Product {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

    private String name;
    private String description;
    private double price;

    @Column(name = "image_url")
    private String imageUrl;

    private String category;
    private String size;

	public Product() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Product(Long id, String name, String description, double price, String imageUrl, String category,
			String size) {
		super();
		this.id = id;
		this.name = name;
		this.description = description;
		this.price = price;
		this.imageUrl = imageUrl;
		this.category = category;
		this.size = size;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getSize() {
		return size;
	}

	public void setSize(String size) {
		this.size = size;
	}

	@Override
	public String toString() {
		return "Product [id=" + id + ", name=" + name + ", description=" + description + ", price=" + price
				+ ", imageUrl=" + imageUrl + ", category=" + category + ", size=" + size + "]";
	}

}
