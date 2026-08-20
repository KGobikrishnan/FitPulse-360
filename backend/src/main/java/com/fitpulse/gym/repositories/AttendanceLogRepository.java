package com.fitpulse.gym.repositories;

import com.fitpulse.gym.models.AttendanceLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AttendanceLogRepository extends JpaRepository<AttendanceLog, Long> {
    List<AttendanceLog> findTop20ByOrderByIdDesc();
}
