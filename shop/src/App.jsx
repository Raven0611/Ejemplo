// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importamos BrowserRouter

import Login from './pages/ManagementLoginRegister/LoginManagement/Login';
import Register from './pages/ManagementLoginRegister/RegisterManagement/Register';
import Main from './pages/Main';

import ViewCategory from './pages/CategoryManagement/ViewCategory/ViewCategory';
import EditCategory from './pages/CategoryManagement/EditCategory/EditCategory';
import CreateCategory from './pages/CategoryManagement/CreateCategory/CreateCategory';

import "./App.css";

import ViewRol from './pages/RolManagement/ViewRol/ViewRol';
import EditRol from './pages/RolManagement/EditRol/EditRol';
import CreateRol from './pages/RolManagement/CreateRol/CreateRol';

import ViewUser from './pages/UserManagement/ViewUser/ViewUser';
import EditUser from './pages/UserManagement/EditUser/EditUser';

import ViewProduct from './pages/ProductManagement/ViewProduct/ViewProduct';
import CreateProduct from './pages/ProductManagement/CreateProduct/CreateProduct';

function App() {
  return (
    /*
    <Router>
    <Routes>
    <Route path='/' element={<Main />} />
    <Route path='/login' element={<Login />} />
    <Route path='/register' element={<Register />} />
    </Routes>
    </Router>
      */
    /*
        <Router>
          <Routes>
            <Route path='/' element={<ViewCategory />} />
            <Route path='/edit/:id' element={<EditCategory />} />
            <Route path='/createCategory' element={<CreateCategory />} />
          </Routes>
        </Router>
    */
    /* <Router>
       <Routes>
         <Route path='/' element={<ViewRol />} />
         <Route path='/edit/:id' element={<EditRol />} />
         <Route path='/create' element={<CreateRol />} />
       </Routes>
     </Router>

    <Router>
      <Routes>
        <Route path='/' element={<ViewUser />} />
        <Route path='/editUser/:id' element={<EditUser />} />
      </Routes>
    </Router>
    
 */
    <Router>
      <Routes>
        <Route path='/' element={<ViewProduct />} />
        <Route path='/create' element={<CreateProduct />} />

      </Routes>
    </Router>

  );

}

export default App;
