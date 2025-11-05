package com.example.backend.controller;

import com.example.backend.model.CafeTable;
import com.example.backend.model.OrderEntity;
import com.example.backend.repository.CafeTableRepository;
import com.example.backend.repository.OrderRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderController {
    private final OrderRepository orderRepo;
    private final CafeTableRepository tableRepo;

    public OrderController(OrderRepository orderRepo, CafeTableRepository tableRepo) {
        this.orderRepo = orderRepo;
        this.tableRepo = tableRepo;
    }

    // ✅ Lấy tất cả order
    @GetMapping
    public List<OrderEntity> all() {
        return orderRepo.findAll();
    }

    // ✅ Lấy 1 order theo ID
    @GetMapping("/{id}")
    public OrderEntity getOne(@PathVariable Long id) {
        return orderRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id " + id));
    }

    // ✅ Thêm order mới & cập nhật trạng thái bàn
    @PostMapping
    public OrderEntity add(@RequestBody OrderEntity o) {
        double total = 0;
        if (o.getItems() != null) {
            for (var it : o.getItems()) {
                total += it.getPrice() * it.getQty();
            }
        }
        o.setTotal(total);
        o.setStatus("NEW");

        // 🔹 Lưu order trước
        OrderEntity savedOrder = orderRepo.save(o);

        // 🔹 Cập nhật trạng thái bàn
        if (o.getTableId() != null) {
            tableRepo.findById(o.getTableId()).ifPresent(table -> {
                table.setStatus("OCCUPIED");
                tableRepo.save(table);
            });
        }

        return savedOrder;
    }

    // ✅ Xóa order
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        if (!orderRepo.existsById(id)) {
            throw new RuntimeException("Order not found with id " + id);
        }
        orderRepo.deleteById(id);
    }
}
