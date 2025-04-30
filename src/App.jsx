import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import News from './Components/News';
import Category from './Components/Category';
import Search from './Components/Search'; 
import Footer from './Components/Footer';

function App() {
  return (
    <Router>
      <Navbar /> 

      <Routes>
        <Route path="/" element={<News />} /> 
        <Route path="/Category" element={<Category />} /> 
        <Route path="/search" element={<Search />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;

