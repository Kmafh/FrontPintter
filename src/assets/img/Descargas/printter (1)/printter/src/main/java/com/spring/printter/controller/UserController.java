package com.spring.printter.controller;
import com.spring.printter.entities.User;
import com.spring.printter.user.IUserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@CrossOrigin(originPatterns = {"*"})
@RestController
@RequestMapping("api/users")
public class UserController {
    @Autowired
    private IUserServices userServices;
    @GetMapping
    public List<User> list() {
        return userServices.findAll();
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> showById(@PathVariable Long id) {
        Optional<User> optionalUser = userServices.findById(id);
        if(optionalUser.isPresent()) {
            return ResponseEntity.ok(optionalUser);
        } else {
            return ResponseEntity.status(404).body(Collections.singletonMap("error","No se encuentra el usuario"));
        }
    }
    @PostMapping
    public ResponseEntity<?> create(@RequestBody User user) {
            return ResponseEntity.ok(userServices.save(user));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id , @RequestBody User user) {
        Optional<User> userOptional = userServices.findById(id);
        if(userOptional.isPresent()) {
            User userBd = userOptional.get();
            userBd.setName(user.getName());
            userBd.setLastname(user.getLastname());
            userBd.setBirthdate(user.getBirthdate());
            userBd.setEmail(user.getEmail());
            userBd.setSex(user.getSex());
            userBd.setPassword(user.getPassword());
            userBd.setRoles(user.getRoles());
            return ResponseEntity.ok(userServices.save(userBd));
        } else {
            return ResponseEntity.status(404).body(Collections.singletonMap("error","No se encuentra el usuario"));

        }
    }
    @DeleteMapping("/id")
    public ResponseEntity<?> delete (@PathVariable Long id) {

        Optional<User> userOptional = userServices.findById(id);
        if(userOptional.isPresent()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(404).body(Collections.singletonMap("error","No se encuentra el usuario"));

        }
    }
}
