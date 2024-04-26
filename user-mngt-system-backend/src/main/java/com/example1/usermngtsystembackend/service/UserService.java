package com.example1.usermngtsystembackend.service;

import com.example1.usermngtsystembackend.model.User;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface UserService {
    User saveUser(User user);

    List<User> getAllUsers();

    User getUserById(long id);

    boolean deleteUser(long id);

    User updateUser(long id, User user);
}
