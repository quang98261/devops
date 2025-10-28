package com.example.backend.controller;

import com.example.backend.model.MenuItem;
import com.example.backend.repository.MenuItemRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/menu")
@CrossOrigin(origins = "*")
public class MenuController {
    private final MenuItemRepository repo;
    public MenuController(MenuItemRepository repo){ this.repo = repo; }
    @GetMapping
    public List<MenuItem> all(){ return repo.findAll(); }
    @PostMapping
    public MenuItem add(@RequestBody MenuItem m){ return repo.save(m); }
    @PutMapping("/{id}")
    public MenuItem update(@PathVariable Long id, @RequestBody MenuItem m){
        return repo.findById(id).map(existing->{
            existing.setName(m.getName());
            existing.setPrice(m.getPrice());
            existing.setImageUrl(m.getImageUrl());
            return repo.save(existing);
        }).orElseGet(()->{ m.setId(id); return repo.save(m); });
    }
}
