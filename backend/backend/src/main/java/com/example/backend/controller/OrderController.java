package com.example.backend.controller;

import com.example.backend.model.OrderEntity;
import com.example.backend.repository.OrderRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderController {
    private final OrderRepository repo;

    public OrderController(OrderRepository repo) {
        this.repo = repo;
    }

    // Lấy tất cả đơn
    @GetMapping
    public List<OrderEntity> all() {
        return repo.findAll();
    }

    // Lấy 1 đơn theo ID
    @GetMapping("/{id}")
    public OrderEntity getOne(@PathVariable Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id " + id));
    }

    // Thêm order
    @PostMapping
    public OrderEntity add(@RequestBody OrderEntity o) {
        double total = 0;
        if (o.getItems() != null) {
            for (var it : o.getItems()) total += it.getPrice() * it.getQty();
        }
        o.setTotal(total);
        o.setStatus("NEW");
        return repo.save(o);
    }

    // Xóa order
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        if (!repo.existsById(id)) {
            throw new RuntimeException("Order not found with id " + id);
        }
        repo.deleteById(id);
    }
}
