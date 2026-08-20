package com.fitpulse.gym.repositories;

import com.fitpulse.gym.models.InventoryItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InventoryItemRepository extends JpaRepository<InventoryItem, Long> {
}
