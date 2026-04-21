package com.marvel.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.marvel.configuration.JwtUtil;
import com.marvel.entity.User;
import com.marvel.service.AuthService;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    @Autowired
    private AuthService service;

    @Autowired
    private JwtUtil jwtUtil;

    // REGISTER
    @PostMapping("/register")
    public String register(@RequestBody User user) {
        return service.register(user);
    }

    // LOGIN
    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody User request) {

        User user = service.login(request.getEmail(), request.getPassword());

        Map<String, Object> response = new HashMap<>();

        if (user != null) {
            String token = jwtUtil.generateToken(user.getEmail(), user.getRole());

            response.put("id", user.getId());
            response.put("token", token);
            response.put("email", user.getEmail());
            response.put("name", user.getName());
            response.put("role", user.getRole());
        } else {
            response.put("error", "Invalid credentials");
        }

        return response;
    }
}