package com.example.Inventory.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.Inventory.entity.inventory;
import com.example.Inventory.repository.inventoryrepo;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins="http://localhost:3000")
public class inventorycontroller {
    @Autowired
    private inventoryrepo repo;

    @GetMapping()
    public List<inventory> getlist(){
        return repo.findAll();
    }
    @PostMapping()
    public inventory createinventoryitem(@Valid @RequestBody inventory item){
        return repo.save(item);
    }
    @PutMapping("/{id}")
    public inventory updateinventory(@PathVariable Long id, @RequestBody inventory item){
        inventory i1 = repo.findById(id).orElseThrow();
        i1.setproduct(item.getproduct());
        i1.setserialNo(item.getserialNo());
        i1.setprice(item.getprice());
        i1.setstock(item.getstock());
        i1.setcategory(item.getcategory());
        i1.setstatus(item.getstatus());
        return repo.save(i1);
    }
    @DeleteMapping("/{id}")
    public void deleteinventory(@PathVariable Long id){
        repo.deleteById(id);
    }
    @GetMapping("/search")
    public List<inventory> searchbyproduct(@RequestParam String product){
        if (product==null|| product.trim().isEmpty()){
            return repo.findAll();
        }
        return repo.findByproductContainingIgnoreCase(product.trim());
    }
    @GetMapping("/sorted")
    public List<inventory> getProductsortedbyprice(@RequestParam (required=false) String sortBy ){
        if (sortBy.equalsIgnoreCase("ASC")){
            return repo.findAll(Sort.by(Sort.Direction.ASC,"price"));
        }
        else{
            return repo.findAll(Sort.by(Sort.Direction.DESC,"price"));
        }
    }
    // @GetMapping("/price")
    // public List<Inventory> searchByPrice(@RequestParam(required=false) Double price) {
    //     List<Inventory> result = repo.findByPrice(price);
    //     if(result == null || result.isEmpty()) {
    //         return repo.findAll();
    //     }
    //     return repo.findByPrice(price);
    // }
    // @GetMapping("/status")
    // public List<inventory> getAvailableStockdetails(@RequestParam (required=false) String status){
    //     if (status==null||status.trim().isEmpty()){
    //         return repo.findAll();
    //     }
    //     String s = status.trim();
    //     if (s.equalsIgnoreCase("NotAvailable")){
    //         return repo.findByStatusIgnoreCase("NotAvailable");
    //     }
    //     else{
    //         return repo.findByStatusIgnoreCase(status.trim());
    //     }
    // }
    @GetMapping("/status")
    public List<inventory> searchByStatus(@RequestParam(required=false) String status) {
        if(status == null || status.trim().isEmpty()) {
            return repo.findAll();
        }
        return repo.findByStatus(status.trim());
    }
    @GetMapping("/count")
    public Long getCount(){
        return repo.count();
    }
    // @GetMapping("/categories")
    // public List<String> getAllCategories(){
    //     return Arrays.asList("electronic","software","Accessories");
    //     // return repo.findAllByCategory();
    // }
    // @GetMapping("/category")
    // public List<String> getAllDistinctCategories() {
    //     return repo.findAllDistinctCategories();
    // }
    // @GetMapping("/category/stock")
    // public Map<String,Object> getcategorystock(@RequestParam String category){
    //     Map<String,Object> response= new HashMap<>();
    //     List<inventory> categoryproduct= repo.findByCategory(category);
    //     int categoryproductstock= categoryproduct.stream().mapToInt(inv->inv.getstock()).sum();
    //     response.put("category",category);
    //     response.put("stock Available",categoryproductstock);
    //     response.put("productcount",categoryproduct.size());
    //     return response;
    // }
    @GetMapping("/categories")
    public ResponseEntity<?> getCategories() { // Fixed method name and endpoint
        try {
            List<Object[]> results = repo.findByCategoriesWithCount(); // Fixed method name
            List<Map<String, Object>> categories = results.stream()
                .map(result -> Map.of(
                    "category", result[0],
                    "product_count", result[1],
                    "total_stock", result[2] // Fixed: "total_stock" instead of "total_count"
                )).toList();
            return ResponseEntity.ok(Map.of(
                "success", true, // Added success flag
                "data", categories
            ));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                "success", false,
                "error", e.getMessage()
            ));
        }
    }

    @GetMapping("/categories/{category}/subcategories") // Fixed endpoint: "subcategories" not "subcategory"
    public ResponseEntity<?> getSubcategoriesWithStats(@PathVariable String category) {
        try {
            List<Object[]> results = repo.findSubcategoriesWithStats(category);
            
            List<Map<String, Object>> subcategories = results.stream()
                .map(result -> Map.of(
                    "subCategory", result[0], // Fixed: lowercase "subcategory"
                    "product_count", result[1],
                    "total_stock", result[2],
                    "average_price", result[3]
                ))
                .toList();
            
            return ResponseEntity.ok(Map.of(
                "success", true,
                "data", subcategories,
                "category", category
            ));
            
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                "success", false,
                "error", e.getMessage()
            ));
        }
    }

    @GetMapping("/categories/{category}/products")
    public ResponseEntity<?> getProductsByCategory(
            @PathVariable String category,
            @RequestParam(required = false) String subCategory,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "20") int limit) {

        try {
            // Calculate offset
            int offset = (page - 1) * limit;

            // Get products with pagination
            List<inventory> products; // Fixed: "Inventory" not "inventory"
            if (subCategory != null && !subCategory.isEmpty()) {
                products = repo.findByCategoryAndSubCategoryWithPagination(
                    category, subCategory, limit, offset);
            } else {
                products = repo.findByCategoryWithPagination(
                    category, limit, offset);
            }

            // Get total count
            long totalProducts;
            if (subCategory != null && !subCategory.isEmpty()) {
                totalProducts = repo.countByCategoryAndSubCategory(category, subCategory);
            } else {
                totalProducts = repo.countByCategory(category);
            }

            int totalPages = (int) Math.ceil((double) totalProducts / limit);

            // Build response
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("data", products);
            response.put("pagination", Map.of(
                "currentPage", page,
                "totalPages", totalPages,
                "totalProducts", totalProducts,
                "hasNext", page < totalPages,
                "hasPrev", page > 1
            ));
            response.put("category", category);
            response.put("subCategory", subCategory != null ? subCategory : "All");

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                "success", false,
                "message", "Error fetching products",
                "error", e.getMessage()
            ));
        }
    }
}

 
    
    

