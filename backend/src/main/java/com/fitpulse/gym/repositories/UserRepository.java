package com.fitpulse.gym.repositories;

import com.fitpulse.gym.models.Role;
import com.fitpulse.gym.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByQrCodeString(String qrCodeString);
    List<User> findByRole(Role role);
    Boolean existsByEmail(String email);
}
