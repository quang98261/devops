package com.example.backend.controller;

import com.example.backend.repository.OrderRepository;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = "*")
public class ReportsController {
    private final OrderRepository orderRepo;
    public ReportsController(OrderRepository orderRepo){ this.orderRepo = orderRepo; }

    @GetMapping("/daily")
    public Object daily(){
        var orders = orderRepo.findAll();
        int customers = orders.size();
        double revenue = orders.stream().mapToDouble(o->o.getTotal()!=null?o.getTotal():0).sum();
        var m = new HashMap<String,Object>();
        m.put("customers", customers);
        m.put("revenue", revenue);
        return m;
    }
}
