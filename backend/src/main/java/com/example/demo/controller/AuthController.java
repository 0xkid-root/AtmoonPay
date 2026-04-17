package com.example.demo.controller;

import org.springframework.web.bind.annotation.*;
import com.example.demo.config.JwtUtil;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Map<String, String> data) {

        String username = data.get("username");
        String password = data.get("password");

        if ("demo".equals(username) && "demo".equals(password)) {

            String token = JwtUtil.generateToken(username);

            Map<String, String> response = new HashMap<>();
            response.put("message", "Login successful");
            response.put("token", token);

            return response;
        }

        throw new RuntimeException("Invalid credentials");
    }
}