package com.example.Inventory.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
@Entity
@Table(name="Inventory")
public class inventory {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message="Product Name cant null ")
    private String product;
    private String serialNo;
    @NotNull(message="Price cant be null")
    private double price;
    private int stock;
    private String category;
    private String subCategory;
    private String status;
    public inventory(){

    }
    public inventory(Long id, String product, String serialNo, double price, int Stock , String category,String subCategory, String status){
        this.id=id;
        this.product=product;
        this.serialNo=serialNo;
        this.price=price;
        this.stock=Stock;
        this.category=category;
        this.subCategory=subCategory;
        this.status=status;
    }
    public Long getid(){
        return id;
    }
    public void setid(Long id){
        this.id=id;
    }
    public String getproduct(){
        return product;
    }
    public void setproduct(String product){
        this.product=product;
    }
    public String getserialNo(){
        return serialNo;
    }
    public void setserialNo(String serialNo){
        this.serialNo=serialNo;
    }
    public double getprice(){
        return price;
    }
    public void setprice(double price){
        this.price=price;
    }
    public int getstock(){
        return stock;
    }
    public void setstock(int stock){
        this.stock=stock;
    }
    public String getcategory(){
        return category;
    }
    public void setcategory(String category){
        this.category=category;
    }
    public String getsubCategory(){
        return subCategory;
    }
    public void setsubCategory(String subCategory){
        this.subCategory=subCategory;
    }
    public String getstatus(){
        return status;
    }
    public void setstatus(String status){
        this.status=status;
    }
    
    
}
