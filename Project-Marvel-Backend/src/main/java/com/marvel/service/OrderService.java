package com.marvel.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.marvel.entity.Order;
import com.marvel.repository.OrderRepository;

@Service
public class OrderService {

    @Autowired
    private OrderRepository repo;

    // PLACE ORDER
    public List<Order> placeOrders(List<Order> orders) {

        for (Order order : orders) {
            order.setDateOfOrder(LocalDate.now());
            order.setDeliveryStatus("PENDING");
        }

        return repo.saveAll(orders);
    }

    // GET USER ORDERS
    public List<Order> getUserOrders(String username) {
        return repo.findByUsername(username);
    }

    // GET ALL ORDERS (ADMIN)
    public List<Order> getAllOrders() {
        return repo.findAll();
    }

    // CANCEL ORDER
    public Order cancelOrder(Long id) {
        Order order = repo.findById(id).orElseThrow();
        order.setDeliveryStatus("CANCELLED");
        return repo.save(order);
    }

    // MARK DELIVERED
    public Order markDelivered(Long id) {
        Order order = repo.findById(id).orElseThrow();
        order.setDeliveryStatus("DELIVERED");
        return repo.save(order);
    }
}