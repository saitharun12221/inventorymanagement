package com.example.Inventory.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.Inventory.entity.inventory;

public interface inventoryrepo extends JpaRepository<inventory, Long> {

    List<inventory> findByproductContainingIgnoreCase(String product);

    // List<inventory> findByStatusIgnoreCase(String status);
    List<inventory> findByStatus(String status);

    List<inventory> findByCategory(String category);
//     @Query("SELECT DISTINCT i.category FROM inventory i")
//     List<String> findAllDistinctCategories();

    @Query("select i.category, count(i), sum(i.stock) "
            + "FROM inventory i "
            + "GROUP BY i.category "
            + "ORDER BY COUNT(i) DESC")
    List<Object[]> findByCategoriesWithCount();

    @Query("SELECT i.subCategory ,COUNT(i) ,SUM(i.stock) ,AVG(i.price) " + "FROM inventory i " + "WHERE category = ?1 " + "GROUP BY i.subCategory " + "ORDER BY COUNT(i) DESC")
    List<Object[]> findSubcategoriesWithStats(String category);

    @Query(value="SELECT * FROM inventory " +
               "WHERE category = ?1 " +
               "AND sub_category = ?2 " +
               "ORDER BY stock DESC " +
               "LIMIT ?3 OFFSET ?4",nativeQuery=true)
List<inventory> findByCategoryAndSubCategoryWithPagination(
        String category, String subCategory, int limit, int offset);


    // Without subcategory filter
    @Query(value = "SELECT * FROM inventory WHERE category = ?1 "
            + "ORDER BY stock DESC LIMIT ?2 OFFSET ?3",
            nativeQuery = true)
    List<inventory> findByCategoryWithPagination(String category, int limit, int offset);

    // Count with subcategory
    Long countByCategoryAndSubCategory(String category, String subCategory);

    // Count without subcategory
    @Query("SELECT COUNT(i) FROM inventory i WHERE i.category = ?1")
    Long countByCategory(String category);

    // List<inventory> findAllByCategory();
}
