import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async actions using Redux Thunk
export const fetchEmployees = createAsyncThunk('employees/fetchEmployees', async () => {
  const response = await fetch('/api/employees');
  const data = await response.json();
  return data.employees;
});

export const addEmployee = createAsyncThunk('employees/addEmployee', async (employee) => {
  const response = await fetch('/api/employees', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(employee),
  });
  const data = await response.json();
  return data.employee;
});

export const updateEmployee = createAsyncThunk('employees/updateEmployee', async (employee) => {
  const response = await fetch(`/api/employees/${employee.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(employee),
  });
  const data = await response.json();
  return data.employee;
});

export const deleteEmployee = createAsyncThunk('employees/deleteEmployee', async (id) => {
  await fetch(`/api/employees/${id}`, {
    method: 'DELETE',
  });
  return id;
});

const employeeSlice = createSlice({
  name: 'employees',
  initialState: {
    employees: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.employees.push(action.payload);
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        const index = state.employees.findIndex((emp) => emp.id === action.payload.id);
        if (index !== -1) {
          state.employees[index] = action.payload;
        }
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.employees = state.employees.filter((emp) => emp.id !== action.payload);
      });
  },
});

export default employeeSlice.reducer;
