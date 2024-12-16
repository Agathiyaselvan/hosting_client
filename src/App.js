import React from 'react';
import './App.css';
import { useFormik } from 'formik';
import axios from 'axios';

function App() {
  const formik = useFormik({
    initialValues: {
      name: '',
      employee_id: '',
      email: '',
      phone: '',
      department: '',
      date_of_joining: '',
      role: '',
    },
    validate: (values) => {
      const errors = {};
      if (!values.name) errors.name = 'Name is required';
      if (!values.employee_id) errors.employee_id = 'Employee ID is required';
      else if (!/^\d+$/.test(values.employee_id)) {
        errors.employee_id = 'Employee ID must be a number';
      }
      if (!values.email) errors.email = 'Email is required';
      if (!values.phone) errors.phone = 'Phone number is required';
      else if (!/^\d{10}$/.test(values.phone)) { // Validates that phone number is exactly 10 digits
        errors.phone = 'Phone number must be exactly 10 digits';
      }
      if (!values.department) errors.department = 'Department is required';
      if (!values.date_of_joining) errors.date_of_joining = 'Date of Joining is required';
      if (!values.role) errors.role = 'Role is required';
      return errors;
    },

    
    onSubmit: (values) => {
      axios
        .post('http://localhost:5000/register', values)
        .then((response) => {
          alert(response.data.message);
          formik.resetForm();
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
  });

  return (
    <div className="App">
      <h1>Employee Management System</h1>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            className={formik.touched.name && formik.errors.name ? 'input-error' : ''}
          />
          {formik.touched.name && formik.errors.name && (
            <div className="error">{formik.errors.name}</div>
          )}
        </div>
        <div>
          <label>Employee ID</label>
          <input
            type="text"
            name="employee_id"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.employee_id}
            className={formik.touched.employee_id && formik.errors.employee_id ? 'input-error' : ''}
          />
          {formik.touched.employee_id && formik.errors.employee_id && (
            <div className="error">{formik.errors.employee_id}</div>
          )}
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className={formik.touched.email && formik.errors.email ? 'input-error' : ''}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="error">{formik.errors.email}</div>
          )}
        </div>
        <div>
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
            className={formik.touched.phone && formik.errors.phone ? 'input-error' : ''}
          />
          {formik.touched.phone && formik.errors.phone && (
            <div className="error">{formik.errors.phone}</div>
          )}
        </div>
        <div>
          <label>Department</label>
          <select
            name="department"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.department}
            className={formik.touched.department && formik.errors.department ? 'input-error' : ''}
          >
            <option value="">Select Department</option>
            <option value="HR">HR</option>
            <option value="Engineering">Engineering</option>
            <option value="Marketing">Marketing</option>
          </select>
          {formik.touched.department && formik.errors.department && (
            <div className="error">{formik.errors.department}</div>
          )}
        </div>
        <div>
          <label>Date of Joining</label>
          <input
            type="date"
            name="date_of_joining"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.date_of_joining}
            max={new Date().toISOString().split('T')[0]} // Prevent future dates
            className={formik.touched.date_of_joining && formik.errors.date_of_joining ? 'input-error' : ''}
          />
          {formik.touched.date_of_joining && formik.errors.date_of_joining && (
            <div className="error">{formik.errors.date_of_joining}</div>
          )}
        </div>
        <div>
          <label>Role</label>
          <input
            type="text"
            name="role"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.role}
            className={formik.touched.role && formik.errors.role ? 'input-error' : ''}
          />
          {formik.touched.role && formik.errors.role && (
            <div className="error">{formik.errors.role}</div>
          )}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
