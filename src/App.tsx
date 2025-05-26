import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import ManuscriptUpload from './pages/ManuscriptUpload';
import ManuscriptDetail from './pages/ManuscriptDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<ManuscriptUpload />} />
        <Route path="/manuscripts/:id" element={<ManuscriptDetail />} />
      </Routes>
    </Router>
  );
}

export default App;