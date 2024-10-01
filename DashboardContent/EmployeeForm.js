// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './EmployeeForm.css';

// const EmployeeForm = ({ onClose, onSubmit, initialData, onCategorySelect }) => {
//   const [employee, setEmployee] = useState({
//     name: '',
//     email: '',
//     password: '',
//     salary: '',
//     address: '',
//     category_id: '', // Updated field name to match the backend
//     image: '',
//   });
//   const [category, setCategory] = useState([]);
//   const [employeeList, setEmployeeList] = useState([]);

//   useEffect(() => {
//     axios
//       .get('http://localhost:5000/categories')
//       .then((result) => {
//         console.log('Category response:', result.data);
//         const categories = result.data; // Assuming the array is directly returned
  
//         if (categories && categories.length > 0) {
//           setCategory(categories);
//         } else {
//           console.error('Error fetching categories:', result.data);
//           alert('Error fetching categories. Please check the console for details.');
//         }
//       })
//       .catch((err) => {
//         console.error('Error fetching categories:', err);
//         alert('Error fetching categories. Please check the console for details.');
//       });
  
//     if (initialData) {
//       setEmployee(initialData);
//     }
//   }, [initialData]);
  
  
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEmployee((prevEmployee) => ({ ...prevEmployee, [name]: value }));

//     if (name === 'category_id') {
//       onCategorySelect(value);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Validate that category_id is not an empty string
//       if (!employee.category_id) {
//         alert('Please select a category');
//         return;
//       }

//       const formData = new FormData();
//       formData.append('name', employee.name);
//       formData.append('email', employee.email);
//       formData.append('password', employee.password);
//       formData.append('address', employee.address);
//       formData.append('salary', employee.salary);
//       formData.append('image', employee.image);
//       formData.append('category_id', employee.category_id);

//       const result = await axios.post('http://localhost:5000/employee', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       console.log('Server response:', result);

//       if (result.data.message === 'Employee saved') {
//         if (initialData) {
//           const updatedEmployee = { ...initialData, ...employee };
//           onSubmit(updatedEmployee);
//         } else {
//           onSubmit(employee);
//         }

//         setEmployeeList([...employeeList, employee]);
//         onClose();
//       } else {
//         alert('Failed to save employee');
//       }
//     } catch (error) {
//       console.error('Error adding/editing employee:', error);
//     }
//   };

//   return (
//     <div className="employee-form card" style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)', width: '1000px', height: '400px' }}>
//       <form encType="multipart/form-data" className="card-body">
//         <div className="row">
//           <div className="col-4">
//             <label htmlFor="inputName" className="form-label">
//               Name
//             </label>
//             <input
//               type="text"
//               className="form-control rounded-0 custom-input"
//               id="inputName"
//               placeholder="Enter Name"
//               onChange={handleChange}
//               name="name"
//               value={employee.name}
//             />
//           </div>
//           <div className="col-4">
//             <label htmlFor="inputEmail4" className="form-label">
//               Email
//             </label>
//             <input
//               type="email"
//               className="form-control rounded-0 custom-input"
//               id="inputEmail4"
//               placeholder="Enter Email"
//               autoComplete="off"
//               onChange={handleChange}
//               name="email"
//               value={employee.email}
//             />
//           </div>
//           <div className="col-4">
//             <label htmlFor="inputPassword4" className="form-label">
//               Password
//             </label>
//             <input
//               type="password"
//               className="form-control rounded-0 custom-input"
//               id="inputPassword4"
//               placeholder="Enter Password"
//               onChange={handleChange}
//               name="password"
//               value={employee.password}
//             />
//           </div>
//         </div>
//         <div className="form-row">
//           <div className="col-4">
//             <label htmlFor="inputSalary" className="form-label">
//               Salary
//             </label>
//             <input
//               type="text"
//               className="form-control rounded-0 custom-input"
//               id="inputSalary"
//               placeholder="Enter Salary"
//               autoComplete="off"
//               onChange={handleChange}
//               name="salary"
//               value={employee.salary}
//             />
//           </div>
//           <div className="col-4">
//             <label htmlFor="inputAddress" className="form-label">
//               Address
//             </label>
//             <input
//               type="text"
//               className="form-control rounded-0 custom-input"
//               id="inputAddress"
//               placeholder="1234 Main St"
//               autoComplete="off"
//               onChange={handleChange}
//               name="address"
//               value={employee.address}
//             />
//           </div>
//           <div className="col-4">
//             <label htmlFor="category" className="form-label">
//               Category
//             </label>
//             <select
//               name="category_id" // Updated field name to match the backend
//               id="category"
//               className="form-select custom-select"
//               onChange={handleChange}
//               value={employee.category_id}
//             >
//               <option value="">Select Category</option>
//               {category.map((c) => (
//                 <option key={c._id} value={c._id}>
//                   {c.categoryName}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//         <div className="form-row mb-3">
//           <div className="col-12">
//             <label className="form-label" htmlFor="inputGroupFile01">
//               Select Image
//             </label>
//             <input
//               type="file"
//               className="form-control rounded-0 custom-file"
//               id="inputGroupFile01"
//               name="image"
//               onChange={(e) => setEmployee({ ...employee, image: e.target.files[0] })}
//             />
//           </div>
//         </div>

//         <div className="col-12 mt-3">
//           <button type="button" className="btn btn-primary w-100 custom-button" onClick={handleSubmit}>
//             {initialData ? 'Edit Employee' : 'Submit'}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default EmployeeForm;









// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './EmployeeForm.css';

// const EmployeeForm = ({ onClose, onSubmit, initialData, onCategorySelect }) => {
//   const [employee, setEmployee] = useState({
//     name: '',
//     email: '',
//     salary: '',
//     address: '',
//     category_id: '',
//     image: '',
//   });

//   useEffect(() => {
//     if (initialData) {
//       setEmployee(initialData);
//     }
//   }, [initialData]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEmployee((prevEmployee) => ({ ...prevEmployee, [name]: value }));

//     if (name === 'category_id') {
//       onCategorySelect(value);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const formData = new FormData();
//       formData.append('name', employee.name);
//       formData.append('email', employee.email);
//       formData.append('address', employee.address);
//       formData.append('salary', employee.salary);
//       formData.append('image', employee.image);
//       formData.append('category_id', employee.category_id);

//       // Handle password separately if needed
//       if (initialData && initialData.password) {
//         formData.append('password', initialData.password);
//       }

//       const result = await axios.post('http://localhost:5000/employee', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       if (result.data.message === 'Employee saved') {
//         onSubmit(employee);
//         onClose();
//       } else {
//         alert('Failed to save employee');
//       }
//     } catch (error) {
//       console.error('Error adding/editing employee:', error);
//     }
//   };

//   return (
//     <div className="employee-form card" style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)', width: '1000px', height: '400px' }}>
//       <form encType="multipart/form-data" className="card-body">
//         <div className="row">
//           <div className="col-4">
//             <label htmlFor="inputName" className="form-label">
//               Name
//             </label>
//             <input
//               type="text"
//               className="form-control rounded-0 custom-input"
//               id="inputName"
//               placeholder="Enter Name"
//               onChange={handleChange}
//               name="name"
//               value={employee.name}
//             />
//           </div>
//           <div className="col-4">
//             <label htmlFor="inputEmail4" className="form-label">
//               Email
//             </label>
//             <input
//               type="email"
//               className="form-control rounded-0 custom-input"
//               id="inputEmail4"
//               placeholder="Enter Email"
//               autoComplete="off"
//               onChange={handleChange}
//               name="email"
//               value={employee.email}
//             />
//           </div>
//           <div className="col-4">
//             <label htmlFor="inputPassword4" className="form-label">
//               Password
//             </label>
//             <input
//               type="password"
//               className="form-control rounded-0 custom-input"
//               id="inputPassword4"
//               placeholder="Enter Password"
//               onChange={handleChange}
//               name="password"
//               value={employee.password}
//             />
//           </div>
//         </div>
//         <div className="form-row">
//           <div className="col-4">
//             <label htmlFor="inputSalary" className="form-label">
//               Salary
//             </label>
//             <input
//               type="text"
//               className="form-control rounded-0 custom-input"
//               id="inputSalary"
//               placeholder="Enter Salary"
//               autoComplete="off"
//               onChange={handleChange}
//               name="salary"
//               value={employee.salary}
//             />
//           </div>
//           <div className="col-4">
//             <label htmlFor="inputAddress" className="form-label">
//               Address
//             </label>
//             <input
//               type="text"
//               className="form-control rounded-0 custom-input"
//               id="inputAddress"
//               placeholder="1234 Main St"
//               autoComplete="off"
//               onChange={handleChange}
//               name="address"
//               value={employee.address}
//             />
//           </div>
//           <div className="col-4">
//             <label htmlFor="category" className="form-label">
//               Category
//             </label>
//             <select
//               name="category_id" // Updated field name to match the backend
//               id="category"
//               className="form-select custom-select"
//               onChange={handleChange}
//               value={employee.category_name}
//             >
//               <option value="">Select Category</option>
//               {category.map((c) => (
//                 <option key={c._id} value={c._id}>
//                   {c.categoryName}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//         <div className="form-row mb-3">
//           <div className="col-12">
//             <label className="form-label" htmlFor="inputGroupFile01">
//               Select Image
//             </label>
//             <input
//               type="file"
//               className="form-control rounded-0 custom-file"
//               id="inputGroupFile01"
//               name="image"
//               onChange={(e) => setEmployee({ ...employee, image: e.target.files[0] })}
//             />
//           </div>
//         </div>

//         <div className="col-12 mt-3">
//           <button type="button" className="btn btn-primary w-100 custom-button" onClick={handleSubmit}>
//             {initialData ? 'Edit Employee' : 'Submit'}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default EmployeeForm;







import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EmployeeForm.css';

const EmployeeForm = ({ onClose, onSubmit, initialData, onCategorySelect, category }) => {
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    salary: '',
    address: '',
    category_id: '',
    image: '',
  });

  useEffect(() => {
    if (initialData) {
      setEmployee(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevEmployee) => ({ ...prevEmployee, [name]: value }));

    if (name === 'category_id') {
      onCategorySelect(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', employee.name);
      formData.append('email', employee.email);
      formData.append('address', employee.address);
      formData.append('salary', employee.salary);
      formData.append('image', employee.image);
      formData.append('category_id', employee.category_id);

      if (initialData && initialData.password) {
        formData.append('password', initialData.password);
      }

      const result = await axios.post('http://localhost:5000/employee', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (result.data.message === 'Employee saved') {
        onSubmit(employee);
        onClose();
      } else {
        alert('Failed to save employee');
      }
    } catch (error) {
      console.error('Error adding/editing employee:', error);
    }
  };

  return (
    <div className="employee-form card" style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)', width: '1000px', height: '400px' }}>
      <form encType="multipart/form-data" className="card-body">
        <div className="row">
          <div className="col-4">
            <label htmlFor="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control rounded-0 custom-input"
              id="inputName"
              placeholder="Enter Name"
              onChange={handleChange}
              name="name"
              value={employee.name}
            />
          </div>
          <div className="col-4">
            <label htmlFor="inputEmail4" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control rounded-0 custom-input"
              id="inputEmail4"
              placeholder="Enter Email"
              autoComplete="off"
              onChange={handleChange}
              name="email"
              value={employee.email}
            />
          </div>
          <div className="col-4">
            <label htmlFor="inputPassword4" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control rounded-0 custom-input"
              id="inputPassword4"
              placeholder="Enter Password"
              onChange={handleChange}
              name="password"
              value={employee.password}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="col-4">
            <label htmlFor="inputSalary" className="form-label">
              Salary
            </label>
            <input
              type="text"
              className="form-control rounded-0 custom-input"
              id="inputSalary"
              placeholder="Enter Salary"
              autoComplete="off"
              onChange={handleChange}
              name="salary"
              value={employee.salary}
            />
          </div>
          <div className="col-4">
            <label htmlFor="inputAddress" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control rounded-0 custom-input"
              id="inputAddress"
              placeholder="1234 Main St"
              autoComplete="off"
              onChange={handleChange}
              name="address"
              value={employee.address}
            />
          </div>
          <div className="col-4">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <select
              name="category_id"
              id="category"
              className="form-select custom-select"
              onChange={handleChange}
              value={employee.category_id}
            >
              <option value="">Select Category</option>
              {category.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.categoryName}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-row mb-3">
          <div className="col-12">
            <label className="form-label" htmlFor="inputGroupFile01">
              Select Image
            </label>
            <input
              type="file"
              className="form-control rounded-0 custom-file"
              id="inputGroupFile01"
              name="image"
              onChange={(e) => setEmployee({ ...employee, image: e.target.files[0] })}
            />
          </div>
        </div>

        <div className="col-12 mt-3">
          <button type="button" className="btn btn-primary w-100 custom-button" onClick={handleSubmit}>
            {initialData ? 'Edit Employee' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
