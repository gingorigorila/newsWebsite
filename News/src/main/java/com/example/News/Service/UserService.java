package com.example.News.Service;

import com.example.News.Exception.UserAlreadyExistsException;
import com.example.News.Model.Role;
import com.example.News.Model.User;
import com.example.News.Repository.RoleRepository;
import com.example.News.Repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService{
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;
    @Override
    public User register(User user) {
        if(userRepository.existsByEmail(user.getEmail())){
            throw new UserAlreadyExistsException(user.getEmail() + "Already exists");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        Role userRole = roleRepository.findByName("ROLE_USER").get();
        user.setRoles(Collections.singleton(userRole));
        return userRepository.save(user);
    }

    @Override
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @Override
    public void deleteUser(String email) {
       User theUser = getUser(email);
       if(theUser != null){
           userRepository.deleteByEmail(email);
       }
    }
    @Transactional
    @Override
    public User getUser(String email) {
        return userRepository.findByEmail(email).
                orElseThrow(()->new UsernameNotFoundException("User not found"));
    }
}
