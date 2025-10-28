package com.example.backend.controller;

import com.example.backend.model.CafeTable;
import com.example.backend.repository.CafeTableRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tables")
@CrossOrigin(origins = "*")
public class TableController {
    private final CafeTableRepository repo;
    public TableController(CafeTableRepository repo){ this.repo = repo; }
    @GetMapping
    public List<CafeTable> all(){ return repo.findAll(); }
    @PostMapping
    public CafeTable add(@RequestBody CafeTable t){ return repo.save(t); }
}
