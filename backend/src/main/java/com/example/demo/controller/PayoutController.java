package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.example.demo.entity.Payout;
import com.example.demo.service.PayoutService;
import com.example.demo.config.JwtUtil;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;

import java.util.List;

@RestController
@RequestMapping("/api/payouts")
@CrossOrigin("*")
public class PayoutController {

    @Autowired
    private PayoutService service;

    // CREATE PAYOUT
    @PostMapping
    public ResponseEntity<?> create(
            @RequestHeader("Authorization") String token,
            @RequestBody Payout payout) {

        try {
            JwtUtil.validateToken(token.replace("Bearer ", ""));
            return ResponseEntity.ok(service.create(payout));
        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Token expired. Please login again.");
        } catch (JwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid token.");
        }
    }

    // GET ALL
    @GetMapping
    public ResponseEntity<?> getAll(
            @RequestHeader("Authorization") String token) {

        try {
            JwtUtil.validateToken(token.replace("Bearer ", ""));
            return ResponseEntity.ok(service.getAll());
        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Token expired. Please login again.");
        } catch (JwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid token.");
        }
    }
}