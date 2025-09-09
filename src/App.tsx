import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { SavingsPage } from './pages/SavingsPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/savings/:savingsId" element={<SavingsPage />} />
    </Routes>
  );
}

export default App;