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
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<News />} />
            <Route path="/category" element={<Category />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
