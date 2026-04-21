package com.marvel.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.marvel.entity.User;
import com.marvel.repository.UserRepository;

@Service
public class AuthService {

    @Autowired
    private UserRepository repo;

    @Autowired
    private BCryptPasswordEncoder encoder;

    // REGISTER
    public String register(User user) {
        Optional<User> existing = repo.findByEmail(user.getEmail());

        if (existing.isPresent()) {
            return "Email already exists";
        }

        user.setPassword(encoder.encode(user.getPassword()));
        
//        user.setRole("USER");
        //default role
        if(user.getRole() == null) {
            user.setRole("USER");
        }
        
        
        repo.save(user);
        return "User registered successfully";
    }

    // LOGIN
    public User login(String email, String password) {
        Optional<User> userOpt = repo.findByEmail(email);

        if (userOpt.isPresent()) {
            User user = userOpt.get();

            if (encoder.matches(password, user.getPassword())) {
                return user;
            }
        }

        return null;
    }
}