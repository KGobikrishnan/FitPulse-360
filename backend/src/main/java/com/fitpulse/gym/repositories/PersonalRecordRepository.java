package com.fitpulse.gym.repositories;

import com.fitpulse.gym.models.PersonalRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PersonalRecordRepository extends JpaRepository<PersonalRecord, Long> {
    List<PersonalRecord> findByUserIdOrderByIdDesc(Long userId);
}
