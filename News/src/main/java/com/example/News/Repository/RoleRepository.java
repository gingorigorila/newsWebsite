package com.example.News.Repository;

import com.example.News.Model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
public interface RoleRepository extends JpaRepository<Role,Long> {
    Optional<Role> findByName(String roleUser);

    boolean existsByName(Role role);
}
