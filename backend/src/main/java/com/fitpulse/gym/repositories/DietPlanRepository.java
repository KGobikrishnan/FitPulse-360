package com.fitpulse.gym.repositories;

import com.fitpulse.gym.models.DietPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DietPlanRepository extends JpaRepository<DietPlan, Long> {
    List<DietPlan> findByTrainerId(String trainerId);
}
