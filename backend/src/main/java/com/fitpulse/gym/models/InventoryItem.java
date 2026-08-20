package com.fitpulse.gym.models;

import jakarta.persistence.*;

@Entity
@Table(name = "inventory_items")
public class InventoryItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String category;
    private Double price;
    private Integer stock;
    private Integer minThreshold;
    private String sku;

    public InventoryItem() {}

    public InventoryItem(String name, String category, Double price, Integer stock, Integer minThreshold, String sku) {
        this.name = name;
        this.category = category;
        this.price = price;
        this.stock = stock;
        this.minThreshold = minThreshold;
        this.sku = sku;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }
    public Integer getStock() { return stock; }
    public void setStock(Integer stock) { this.stock = stock; }
    public Integer getMinThreshold() { return minThreshold; }
    public void setMinThreshold(Integer minThreshold) { this.minThreshold = minThreshold; }
    public String getSku() { return sku; }
    public void setSku(String sku) { this.sku = sku; }
}
