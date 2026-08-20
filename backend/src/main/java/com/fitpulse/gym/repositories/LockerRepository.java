package com.fitpulse.gym.repositories;

import com.fitpulse.gym.models.Locker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LockerRepository extends JpaRepository<Locker, Long> {
}
