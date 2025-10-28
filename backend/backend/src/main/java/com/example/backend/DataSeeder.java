package com.example.backend;

import com.example.backend.model.Company;
import com.example.backend.repository.CompanyRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    private final CompanyRepository repo;
    public DataSeeder(CompanyRepository repo) { this.repo = repo; }

    @Override
    public void run(String... args) throws Exception {
        if (repo.count() == 0) {
            Company c1 = new Company(); c1.setName("Acme Corp"); c1.setWebsite("https://acme.example"); c1.setEmail("contact@acme.com"); c1.setPhone("0123456789"); c1.setAddress("Hanoi");
            Company c2 = new Company(); c2.setName("Beta Ltd"); c2.setWebsite("https://beta.example"); c2.setEmail("info@beta.com"); c2.setPhone("0987654321"); c2.setAddress("HCM");
            repo.save(c1); repo.save(c2);
        }
    }
}
