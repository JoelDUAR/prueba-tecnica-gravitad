import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './views/Home/Home';
import Login from './views/Login/Login';
import CharacterForm from './views/CharacterForm/CharacterForm';
import CharacterDetail from './views/CharacterDetail/CharacterDetail';
import Navbar from './components/Navbar/Navbar';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Footer from './components/Footer/Footer';
import SingUP from './views/SignUp/SignUp';
import NotFound from './views/NotFound/NotFound';

const App: React.FC = () => {

  const location = useLocation();
  
  return (
    <>
      {location.pathname !== "/" && <Navbar />}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<SingUP />} />
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/character/:id" element={<PrivateRoute><CharacterDetail /></PrivateRoute>} />
        <Route path="/character/edit/:id" element={<PrivateRoute><CharacterDetail /></PrivateRoute>} />
        <Route path="/CharacterForm" element={<PrivateRoute><CharacterForm /></PrivateRoute>} />

        <Route path="*" element={<NotFound />} />
      </Routes>

      {location.pathname !== "/" && <Footer />}
    </>
  );
};

export default App;