package com.example.demo.controller;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/students")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<User>> getAll() {
        List<User> users = userRepository.findAll();
        return ResponseEntity.ok(users);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity.badRequest().body("Tài khoản đã tồn tại");
        }
        User saveUser = userRepository.save(user);
        return ResponseEntity.ok(saveUser);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user) {
        User existUser = userRepository.findByEmail(user.getEmail());
        if (existUser != null && existUser.getPassword().equals(user.getPassword())) {
            return ResponseEntity.ok("Chúc mừng đăng nhập thành công");
        }
        return ResponseEntity.badRequest().body("Đăng nhập thất bại");
    }
    
    @PutMapping("/{id")
    public ResponseEntity<String> updateUser(@PathVariable Long id,@RequestBody User newInfo){
        User user = userRepository.findById(id).orElse(null);
        if (user == null){
            return ResponseEntity.badRequest().body("Tài khoản không tồn tại!");
        }
        user.setName(newInfo.getName());
        user.setSchool(newInfo.getSchool());
        userRepository.save(user);
        return ResponseEntity.ok("Cập nhật thông tin thành công");
    }

    @GetMapping("{id}")
    public ResponseEntity<?> getUser(@PathVariable Long id){
        User user = userRepository.findById(id).orElse(null);
        if (user == null){
            return ResponseEntity.badRequest().body("Không tồn tại tài khoản");
        }
        return ResponseEntity.ok(user);
    }
}
