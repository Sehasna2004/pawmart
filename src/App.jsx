import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';

// --- PAGE & COMPONENT IMPORTS ---
import MainGallery from './pages/MainGallery';
import AdminPanel from './components/AdminPanel';
import Store from './Store'; 
import Login from './pages/Login'; 
import Signup from './pages/Signup'; 
import AddProductForm from './pages/AddProductForm';
import AddPetForm from './pages/AddPetForm';
import RehomePetForm from './pages/RehomePetForm';

// --- AUTH PROTECTION COMPONENT ---
const ProtectedRoute = ({ children }) => {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  return isAdmin ? children : <Navigate to="/login" replace />;
};

function App() {
  const [pets, setPets] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const [username, setUsername] = useState(localStorage.getItem('username') || '');

  const refreshPets = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/pets");
      setPets(res.data);
    } catch (err) { 
      console.error("Backend Connection Failed:", err); 
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setUsername('');
    window.location.href = "/"; 
  };

  useEffect(() => {
    refreshPets();
    const checkAuth = () => {
      setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
      setUsername(localStorage.getItem('username') || '');
    };
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <MainGallery 
            pets={pets} 
            isLoggedIn={isLoggedIn} 
            username={username} 
            onLogout={handleLogout} 
          />
        } />
        <Route path="/store" element={<Store />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/rehome-pet" element={<RehomePetForm />} />

        {/* Admin Routes */}
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminPanel pets={pets} refreshPets={refreshPets} />
          </ProtectedRoute>
        } />
        
        <Route path="/admin/add-product" element={
          <ProtectedRoute>
            <AddProductForm />
          </ProtectedRoute>
        } />

        <Route path="/admin/add-pet" element={
          <ProtectedRoute>
            <AddPetForm />
          </ProtectedRoute>
        } />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;