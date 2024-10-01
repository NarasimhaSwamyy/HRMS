import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddCategoryContent.css';



const AddCategoryContent = () => {
  const [showForm, setShowForm] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [categoryList, setCategoryList] = useState([]);

  const handleAddCategory = () => {
    setShowForm(true);
  };

  const handleSubmitCategory = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/category', {
        categoryName: categoryName,
      });

      if (response.data.message === 'Category submitted successfully!') {
        setCategoryList([...categoryList, { _id: response.data.result._id, categoryName: response.data.result.categoryName }]);
        setCategoryName('');
        setShowForm(false);
      } else {
        alert('Failed to save category');
      }
    } catch (error) {
      console.error('Error adding category:', error);
      alert(`An error occurred while adding the category: ${error.message}`);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/categories');
        setCategoryList(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <button onClick={handleAddCategory} className="add-category-button">
        Add Category
      </button>

      {showForm ? (
        <div className="card mt-3">
          <div className="card-body">
            <h3 className="card-title">Add Category</h3>
            <form onSubmit={handleSubmitCategory}>
            <div style={{ marginBottom: '10px' }}>
                <label htmlFor="categoryName" style={{ display: 'block', marginBottom: '5px' }}>
                  Category Name:
                </label>
                <input
                  type="text"
                  id="categoryName"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  style={{ width: '100%', padding: '8px' }}
                />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                Submit
              </button>
             
            </form>
          </div>
        </div>
      ) : null}

      <div className="mt-3">
        <h3>Category List</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {categoryList.map((category) => (
              <tr key={category._id}>
                <td>{category.categoryName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddCategoryContent;

