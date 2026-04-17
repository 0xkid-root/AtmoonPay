package com.example.demo.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/balance")
@CrossOrigin("*")
public class BalanceController {

    @GetMapping
    public int getBalance() {
        return 5000;
    }
}