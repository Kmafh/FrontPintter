package com.spring.printter.repositories;

import com.spring.printter.entities.User;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface IUserRepository extends CrudRepository<User,Long> {

    Optional<User> findByEmail(String name);
}
