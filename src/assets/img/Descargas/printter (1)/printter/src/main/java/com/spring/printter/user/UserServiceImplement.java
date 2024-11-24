package com.spring.printter.user;

import com.spring.printter.entities.User;
import com.spring.printter.repositories.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImplement implements IUserServices {

    @Autowired
    private IUserRepository repository;

    public UserServiceImplement(IUserRepository repository) {
        this.repository = repository;
    }
    @Override
    @Transactional(readOnly = true)
    public List<User> findAll() {
        return (List<User>) this.repository.findAll();
    }

    @Override
    @Transactional(readOnly = true)

    public Optional<User> findById(Long id) {
        return this.repository.findById(id);
    }

    @Override
    @Transactional
    public User save(User user) {
        return this.repository.save(user);
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        this.repository.deleteById(id);
    }
}
