package com.spring.printter.user;

import com.spring.printter.entities.User;

import java.util.List;
import java.util.Optional;

public interface IUserServices {
    List<User> findAll();
    Optional<User> findById(Long id);
    User save(User user);
    void deleteById(Long id);
}
