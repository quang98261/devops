package com.example.backend.controller;

import com.example.backend.model.Company;
import com.example.backend.repository.CompanyRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/companies")
@CrossOrigin(origins = "*")
public class CompanyController {
    private final CompanyRepository repo;
    public CompanyController(CompanyRepository repo) { this.repo = repo; }

    @GetMapping
    public List<Company> all() { return repo.findAll(); }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        if (!repo.existsById(id)) return ResponseEntity.notFound().build();
        repo.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
