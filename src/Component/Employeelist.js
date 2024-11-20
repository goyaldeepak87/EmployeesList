import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployees, addEmployee, updateEmployee, deleteEmployee } from '../redux/slice/employeeSlice';
import { TextField, Button, Card, CardContent, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Employeelist = () => {
  const dispatch = useDispatch();
  const { employees, loading, error } = useSelector((state) => state.employees);
  const [newEmployee, setNewEmployee] = useState({ name: '', position: '', email: '' });
  const [editingEmployee, setEditingEmployee] = useState(null);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);
  const navigate = useNavigate(); 

  const handleAddEmployee = () => {
    dispatch(addEmployee({ ...newEmployee, id: Date.now() }));
    setNewEmployee({ name: '', position: '', email: '' });
    navigate('/');
  };

  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee);
    setNewEmployee({ name: employee.name, position: employee.position, email: employee.email });
  };

  const handleUpdateEmployee = () => {
    dispatch(updateEmployee({ ...editingEmployee, ...newEmployee }));
    setEditingEmployee(null);
    setNewEmployee({ name: '', position: '', email: '' });
  };

  const handleDeleteEmployee = (id) => {
    dispatch(deleteEmployee(id));
  };

  return (
    <div>
        <Container maxWidth="lg">
      <h2>ADD EMPLOYEE LIST</h2>

      {loading && <p>Loading...</p>}

      <div style={{ display: 'flex', flexDirection: 'column', margin: '20px' }}>
        <TextField
          label="Name"
          value={newEmployee.name}
          style={{ marginBottom: '8px' }}
          onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
        />
        <TextField
          label="Position"
          value={newEmployee.position}
          style={{ marginBottom: '8px' }}
          onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
        />
        <TextField
          label="Email"
          value={newEmployee.email}
          style={{ marginBottom: '8px' }}
          onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={editingEmployee ? handleUpdateEmployee : handleAddEmployee}
        >
          {editingEmployee ? 'Update Employee' : 'Add Employee'}
        </Button>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {employees.map((employee) => (
          <Card key={employee.id} style={{ margin: '10px', width: '200px' }}>
            <CardContent>
              <Typography variant="h6">{employee.name}</Typography>
              <Typography variant="body2">{employee.position}</Typography>
              <Typography variant="body2">{employee.email}</Typography>
              <Button variant="outlined" onClick={() => handleEditEmployee(employee)}>
                Edit
              </Button>
              <Button variant="outlined" color="secondary" onClick={() => handleDeleteEmployee(employee.id)}>
                Delete
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      </Container>
    </div>
  );
};

export default Employeelist;
