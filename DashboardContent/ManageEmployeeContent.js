// src/DashboardContent/ManageEmployeeContent.js
import React, { useState, useEffect } from 'react';
import EmployeeForm from './EmployeeForm';
import axios from 'axios';
import './ManageEmployeeContent.css';

const ManageEmployeeContent = () => {
  const [showForm, setShowForm] = useState(false);
  const [employeeList, setEmployeeList] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories when component mounts
    axios
      .get('http://localhost:5000/categories')
      .then((result) => {
        console.log('Category response:', result.data);
        const categories = result.data;

        if (categories && categories.length > 0) {
          setCategories(categories);
        } else {
          console.error('Error fetching categories:', result.data);
          alert('Error fetching categories. Please check the console for details.');
        }
      })
      .catch((err) => {
        console.error('Error fetching categories:', err);
        alert('Error fetching categories. Please check the console for details.');
      });

    // Fetch employees when component mounts
    axios
      .get('http://localhost:5000/employees')
      .then((result) => {
        console.log('Employee response:', result.data);
        setEmployeeList(result.data);
      })
      .catch((err) => {
        console.error('Error fetching employees:', err);
        alert('Error fetching employees. Please check the console for details.');
      });
  }, []);

  const handleAddEmployeeClick = () => {
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
  };

  const handleFormSubmit = (formData) => {
    setEmployeeList([...employeeList, formData]);
    setShowForm(false);
  };

  const handleEditEmployee = (index, formData) => {
    setShowForm(true);
    // Pass the initial data to the form
    <EmployeeForm
      onClose={handleFormClose}
      onSubmit={(updatedData) => handleFormSubmit(index, updatedData)}
      initialData={formData}
      onCategorySelect={handleCategorySelect}
      category={categories}
    />;
  };

  const handleDeleteEmployee = (index) => {
    setEmployeeList(employeeList.filter((_, i) => i !== index));
  };

  const handleCategorySelect = (value) => {
    // Implement the logic for category selection if needed
    // For now, you can leave it empty if not needed
  };

  return (
    <div>
      <button className="add-employee-button" onClick={handleAddEmployeeClick}>
        <span className="visually-hidden">Add Employee</span>
      </button>

      {showForm && (
        <EmployeeForm
          onClose={handleFormClose}
          onSubmit={handleFormSubmit}
          initialData={null}
          onCategorySelect={handleCategorySelect}
          category={categories}
        />
      )}

      <div className="employee-list">
        <h3>Employee List</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Salary</th>
              <th>Address</th>
              <th>Category</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employeeList.map((employee, index) => (
              <tr key={index}>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.salary}</td>
                <td>{employee.address}</td>
                <td>{employee.categoryName}</td>
                <td>
                  {employee.imageUrl && (
                    <img src={employee.imageUrl} alt="Employee" style={{ width: '50px', height: '50px' }} />
                  )}
                </td>
                <td>
                <button className="edit-button" onClick={() => handleEditEmployee(index, employee)}>Edit</button>
<button className="delete-button" onClick={() => handleDeleteEmployee(index)}>Delete</button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageEmployeeContent;
