// components/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useCategories } from './useCategories';
import { categoryService } from './api';

const Dashboard = () => {
  const { categories, loading, error } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [subcategories, setSubcategories] = useState([]);
  const [inventory, setinventory] = useState([]); // Fixed: setInventory
  const [productsLoading, setProductsLoading] = useState(false);
  const [categoryStats, setCategoryStats] = useState(null);

  // Fetch subcategories when category is selected
  useEffect(() => {
    if (selectedCategory) {
      const fetchSubcategories = async () => {
        try {
          const response = await categoryService.getSubcategories(selectedCategory);
          setSubcategories(response.data); // Fixed: response.data
          setSelectedSubcategory('');
        } catch (err) {
          console.error('Error fetching subcategories:', err);
        }
      };
      fetchSubcategories();
    } else {
      setSubcategories([]);
      setSelectedSubcategory('');
    }
  }, [selectedCategory]);

  // Fetch products when category or subcategory changes
  useEffect(() => {
  const fetchProducts = async () => {
    if (!selectedCategory) return;
    
    setProductsLoading(true);
    try {
      const response = await categoryService.getProductsByCategory(
        selectedCategory, 
        selectedSubcategory || null
      );
      
      setinventory(response.data);
      setCategoryStats({
        category: response.category,
        subCategory: response.subCategory || 'All',
        totalProducts: response.pagination?.totalProducts || 0
      });
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setProductsLoading(false);
    }
  };

  if (selectedCategory) {
    fetchProducts();
  } else {
    setinventory([]);
    setCategoryStats(null);
  }
}, [selectedCategory, selectedSubcategory]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedSubcategory(''); // Reset subcategory when category changes
  };

  const handleSubcategoryChange = (subCategory) => {
    setSelectedSubcategory(subCategory);
  };

  // Add debug logging
  useEffect(() => {
    console.log('Categories:', categories);
    console.log('Subcategories:', subcategories);
    console.log('Inventory:', inventory);
    console.log('Category Stats:', categoryStats);
  }, [categories, subcategories, inventory, categoryStats]);

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading categories...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <h3>Error Loading Categories</h3>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
  <div className="row">
    <div className="col-12">
      {/* Header */}
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold text-primary">Product Category Manager</h1>
        <p className="lead text-muted">Select a category to view product counts and stock information</p>
      </div>

      {/* Category Selection */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <label htmlFor="category-select" className="form-label fw-semibold">
                <i className="bi bi-folder me-2"></i>Select Category:
              </label>
              <select
                id="category-select"
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="form-select form-select-lg"
              >
                <option value="">-- Select a Category --</option>
                {categories.map(category => (
                  <option key={category.category} value={category.category}>
                    {category.category} ({category.product_count} products, {category.total_stock} in stock)
                  </option>
                ))}
              </select>
            </div>

            {/* Subcategory Selection */}
            {selectedCategory && subcategories.length > 0 && (
              <div className="col-md-6">
                <label htmlFor="subcategory-select" className="form-label fw-semibold">
                  <i className="bi bi-folder2 me-2"></i>Filter by Subcategory:
                </label>
                <select
                  id="subcategory-select"
                  value={selectedSubcategory}
                  onChange={(e) => handleSubcategoryChange(e.target.value)}
                  className="form-select form-select-lg"
                >
                  <option value="">-- All Subcategories --</option>
                  {subcategories.map(subcat => (
                    <option key={subcat.subCategory} value={subcat.subCategory}>
                      {subcat.subCategory} ({subcat.product_count} products, {subcat.total_stock} in stock)
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Category Statistics */}
      {categoryStats && (
  <div className="card bg-primary text-white mb-4">
    <div className="card-body">
      <h2 className="card-title h4">
        <i className="bi bi-graph-up me-2"></i>
        {categoryStats.category}
        {categoryStats.subCategory !== 'All' && ` > ${categoryStats.subCategory}`}
      </h2>
      <div className="row mt-3">
        <div className="col-md-3">
          <div className="text-center">
            <div className="h2 fw-bold">{categoryStats.totalProducts}</div>
            <div className="opacity-75">Total Products</div>
          </div>
        </div>
    </div>
  </div>
  </div>
)}

      {/* Subcategories Overview */}
      {selectedCategory && subcategories.length > 0 && !selectedSubcategory && (
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-light">
            <h3 className="card-title h5 mb-0">
              <i className="bi bi-grid-3x3 me-2"></i>Subcategories Overview
            </h3>
          </div>
          <div className="card-body">
            <div className="row g-3">
              {subcategories.map(subcat => (
                <div key={subcat.subCategory} className="col-md-6 col-lg-4">
                  <div 
                    className="card h-100 border hover-shadow cursor-pointer"
                    onClick={() => handleSubcategoryChange(subcat.subCategory)}
                    style={{transition: 'all 0.3s ease', cursor: 'pointer'}}
                  >
                    <div className="card-body text-center">
                      <h5 className="card-title text-primary">{subcat.subCategory}</h5>
                      <div className="mt-3">
                        <span className="badge bg-primary me-1">{subcat.product_count} products</span>
                        <span className="badge bg-success me-1">{subcat.total_stock} in stock</span>
                        <span className="badge bg-warning text-dark">Avg: ${subcat.average_price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Products List */}
      {productsLoading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" style={{width: '3rem', height: '3rem'}}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading products...</p>
        </div>
      ) : (
        inventory.length > 0 && (
          <div className="card shadow-sm">
            <div className="card-header bg-light">
              <h3 className="card-title h5 mb-0">
                <i className="bi bi-basket me-2"></i>Products
              </h3>
            </div>
            <div className="card-body">
              <div className="row g-3">
                {inventory.map(product => (
                  <div key={product.id} className="col-md-6 col-lg-4">
                    <div className="card h-100 border">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <h5 className="card-title text-truncate">{product.product}</h5>
                          <span className={`badge ${product.stock > 0 ? 'bg-success' : 'bg-danger'}`}>
                            {product.stock} in stock
                          </span>
                        </div>
                        <div className="text-muted">
                          <small className="d-block">
                            <i className="bi bi-tag me-1"></i>
                            Subcategory: {product.subCategory}
                          </small>
                          <small className="d-block mt-1">
                            <i className="bi bi-currency-dollar me-1"></i>
                            Price: ${product.price}
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      )}

      {/* Empty State */}
      {selectedCategory && !productsLoading && inventory.length === 0 && (
        <div className="card text-center py-5">
          <div className="card-body">
            <i className="bi bi-inbox display-1 text-muted"></i>
            <h3 className="card-title mt-3">No products found</h3>
            <p className="card-text text-muted">Try selecting a different subcategory or check back later.</p>
          </div>
        </div>
      )}
    </div>
  </div>
</div>
  )
};

export default Dashboard;