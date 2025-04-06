import { useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';  
import Home from './Home';
import Create from './Create';
import Read from './Read';
import Edit from './Edit';
import Login from './Login';
import Delete from './Delete';
import MainPage from './MainPage';  
import MakePayments from './MakePayments';
import PastPayments from './PastPayments';
import FDs from './FDs';
import FixedDeposits from './FixedDeposits';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  const handleLoginSuccess = (id) => {
    setIsLoggedIn(true); 
    setUserId(id); 
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={isLoggedIn ? <Navigate to={`/mainpage/${userId}`} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/login" 
          element={<Login onLoginSuccess={handleLoginSuccess} />} 
        />
        <Route 
          path="/mainpage/:userId" 
          element={isLoggedIn ? <MainPage /> : <Navigate to="/login" />} 
        />
        <Route path="/past-payment/:userId" element={isLoggedIn ? <PastPayments /> : <Navigate to="/login" />} />
        <Route path="/make-payment/:id" element={isLoggedIn ? <MakePayments /> : <Navigate to="/login" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/read/:id" element={<Read />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/delete/:id" element={<Delete />} />
        <Route path="/fixed-deposits/:userId" element={<FixedDeposits />} />
        <Route path="/fds/:userId" element={<FixedDeposits />} />

      </Routes>
    </BrowserRouter>
  );
}
export default App;
