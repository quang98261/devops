package com.example.backend.controller;

import com.example.backend.dto.LoginRequest;
import com.example.backend.dto.RegisterRequest;
import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*") // allow requests from frontend during development
public class AuthController {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest req) {
        if (req.getEmail() == null || req.getPassword() == null) {
            return ResponseEntity.badRequest().body("email and password are required");
        }
        if (userRepository.findByUsername(req.getEmail()).isPresent()) {
            return ResponseEntity.status(409).body("email exists");
        }
        User u = new User();
        u.setUsername(req.getEmail());
        u.setPassword(passwordEncoder.encode(req.getPassword()));
        u.setName(req.getName());
        u.setPhone(req.getPhone());
        u.setAddress(req.getAddress());
        userRepository.save(u);
        Map<String,Object> res = new HashMap<>();
        res.put("id", u.getId());
        res.put("username", u.getUsername());
        return ResponseEntity.ok(res);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        var opt = userRepository.findByUsername(req.getEmail());
        if (opt.isEmpty()) return ResponseEntity.status(401).body("invalid credentials");
        User u = opt.get();
        if (!passwordEncoder.matches(req.getPassword(), u.getPassword())) {
            return ResponseEntity.status(401).body("invalid credentials");
        }
        Map<String,Object> res = new HashMap<>();
        res.put("id", u.getId());
        res.put("username", u.getUsername());
        // return a dummy token (frontend expects token field). Replace with JWT in prod.
        res.put("token", "dummy-token-" + u.getId());
        return ResponseEntity.ok(res);
    }
}
