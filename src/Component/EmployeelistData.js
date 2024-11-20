import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployees, addEmployee, updateEmployee, deleteEmployee } from '../redux/slice/employeeSlice';
import { Button, Card, CardContent, Typography, Container } from '@mui/material'; // Importing Container
import { useNavigate } from 'react-router-dom';

const EmployeelistData = () => {
    const dispatch = useDispatch();
    const { employees, loading, error } = useSelector((state) => state.employees);
    const [newEmployee, setNewEmployee] = useState({ name: '', position: '', email: '' });

    useEffect(() => {
        dispatch(fetchEmployees());
    }, [dispatch]);

    const handleEditEmployee = (employee) => {
        setNewEmployee({ name: employee.name, position: employee.position, email: employee.email });
        handleButtonClick();
    };

    const handleDeleteEmployee = (id) => {
        dispatch(deleteEmployee(id));
    };

    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/add-employee');
    };

    return (
        <Container maxWidth="lg">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: '20px' }}>
                <h2>EMPLOYEE LIST</h2>
                <Button variant="outlined" color="secondary" onClick={handleButtonClick}>ADD EMPLOYEE</Button>
            </div>

            {loading && <p>Loading...</p>}

            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {employees.map((employee) => (
                    <Card key={employee.id} style={{ margin: '10px', width: '200px' }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ marginBottom: '8px' }}>
                                {employee.name}
                            </Typography>
                            <Typography variant="body2" sx={{ marginBottom: '8px' }}>
                                {employee.position}
                            </Typography>
                            <Typography variant="body2" sx={{ marginBottom: '8px' }}>
                                {employee.email}
                            </Typography>
                            <Button variant="outlined" onClick={() => handleEditEmployee(employee)} sx={{ marginRight: '8px' }}>
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
    );
};

export default EmployeelistData;
