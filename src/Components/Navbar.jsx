import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
      setSearchQuery('');
      setMenuOpen(false); 
    }
  };

  return (
    <nav className="bg-blue-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="text-2xl font-bold">TrendyNews</div>

        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden focus:outline-none">
          {menuOpen ? (
            <X size={28} />
          ) : (
            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 5.5H11" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 12.5H16" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 19.5H21" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </button>

        <div className="space-x-6 hidden md:flex items-center">
          <Link to="/" className="font-bold text-xl hover:text-blue-300 transition">Home</Link>
          <Link to="/Category" className="font-bold text-xl hover:text-blue-300 transition">Category</Link>

          <form onSubmit={handleSearch} className="relative w-48 md:w-64">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white text-black focus:outline-none"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
          </form>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-4">
          <Link to="/" onClick={() => setMenuOpen(false)} className="block font-semibold hover:text-blue-300">Home</Link>
          <Link to="/Category" onClick={() => setMenuOpen(false)} className="block font-semibold hover:text-blue-300">Category</Link>
          
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white text-black focus:outline-none"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
          </form>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
