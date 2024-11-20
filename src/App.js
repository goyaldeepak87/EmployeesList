import logo from './logo.svg';
import './App.css';
import Employeelist from './Component/Employeelist';
import { Route, Routes, Link, BrowserRouter } from 'react-router-dom';
import EmployeelistData from './Component/EmployeelistData';

function App() {
  return (
    <div>
      <BrowserRouter basename='EmployeesList'>
        <Routes>
          <Route path="/EmployeesList" element={<EmployeelistData />} />
          <Route path="/add-employee/" element={<Employeelist />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
