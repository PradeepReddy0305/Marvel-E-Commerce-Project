package com.marvel.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.marvel.entity.Order;
import com.marvel.service.OrderService;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin
public class OrderController {

    @Autowired
    private OrderService service;

    // PLACE ORDER
    @PostMapping("/place")
    public List<Order> placeOrder(@RequestBody List<Order> orders) {
        return service.placeOrders(orders);
    }

    // USER ORDERS
    @GetMapping("/user/{username}")
    public List<Order> getUserOrders(@PathVariable String username) {
        return service.getUserOrders(username);
    }

    // ADMIN - ALL ORDERS
    @GetMapping("/all")
    public List<Order> getAllOrders() {
        return service.getAllOrders();
    }

    // CANCEL ORDER
    @PutMapping("/cancel/{id}")
    public Order cancelOrder(@PathVariable Long id) {
        return service.cancelOrder(id);
    }

    // MARK DELIVERED
    @PutMapping("/deliver/{id}")
    public Order deliverOrder(@PathVariable Long id) {
        return service.markDelivered(id);
    }
}