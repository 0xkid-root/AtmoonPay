package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.entity.Payout;
import com.example.demo.repository.PayoutRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PayoutService {

    @Autowired
    private PayoutRepository repo;

    public Payout create(Payout payout) {
        payout.setStatus("Pending");
        payout.setCreatedAt(LocalDateTime.now());
        return repo.save(payout);
    }

    public List<Payout> getAll() {
        return repo.findAll();
    }
}