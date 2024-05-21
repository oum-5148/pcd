import React, { useState, useEffect } from 'react';
import '../css/database.css';
import PlusIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ModifyIcon from '@mui/icons-material/Edit';
import axios from 'axios';

const Database = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null); // State to hold the selected employee for modification
  const [editedEmployee, setEditedEmployee] = useState(null); // State to hold the edited employee data

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:3002/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3002/employees/${id}`);
      setEmployees(employees.filter(employee => employee._id !== id));
    } catch (error) {
      console.error('Error deleting employee:', error);
      // Handle error, display a message, or perform other actions as needed
    }
  };
  

  const handleModify = (employee) => {
    setSelectedEmployee(employee); // Set selectedEmployee when Modify button is clicked
    setEditedEmployee({ ...employee }); // Set editedEmployee with the selected employee data
  };

  const handleAddEmployee = () => {
    setSelectedEmployee({}); // Set selectedEmployee to open the pop-up
    setEditedEmployee({ // Initialize editedEmployee with empty values
      firstName: '',
      lastName: '',
      role: '',
      email: '',
      phonenumber: ''
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedEmployee(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3002/employees/${editedEmployee._id}`, editedEmployee);
      // Update the employee list with the modified employee data
      setEmployees(employees.map(employee => (employee._id === editedEmployee._id ? editedEmployee : employee)));
      setSelectedEmployee(null); // Close the pop-up after successful update
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  return (
    <section className="employee">
      <div className="employee-list"> 
        <div className="main-top">
          <h1>Employees List</h1>
          <PlusIcon className='add-icon' onClick={handleAddEmployee} /> {/* Call handleAddEmployee when PlusIcon is clicked */}        </div>
        <table className="table">
          <thead>
            <tr>
              <th>CIN</th>
              <th>First name</th>
              <th>Last name</th>
              <th>Role</th>
              <th>Email</th>
              <th>Phone number</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {employees.map(employee => (
              <tr key={employee._id}>
                <td>{employee.CIN}</td>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.role}</td>
                <td>{employee.email}</td>
                <td>{employee.phonenumber}</td>
                <td><button onClick={() => handleModify(employee)}><ModifyIcon />Modify</button></td> {/* Call handleModify function when Modify button is clicked */}
                <td><button onClick={() => handleDelete(employee._id)}><DeleteIcon className='delete-icon'/></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedEmployee && (
        <div className="popup">
        <div className="popup-inner">
          <h2>Modify Employee</h2>
          <form onSubmit={handleSubmit}>
            <label>First Name</label>
            <input type="text" name="firstName" value={editedEmployee.firstName} onChange={handleChange} required />
            <label>Last Name</label>
            <input type="text" name="lastName" value={editedEmployee.lastName} onChange={handleChange} required />
            <label>Role</label>
            <input type="text" name="role" value={editedEmployee.role} onChange={handleChange} required />
            <label>Email</label>
            <input type="email" name="email" value={editedEmployee.email} onChange={handleChange} required />
            <label>Phone Number</label>
            <input type="text" name="phonenumber" value={editedEmployee.phonenumber} onChange={handleChange} required />
            <button type="submit" className="save">Save</button>
            <button type="button" onClick={() => setSelectedEmployee(null)} className="cancel">Cancel</button>
          </form>
        </div>
      </div>
      )}
    </section>
  );
};

export default Database;
