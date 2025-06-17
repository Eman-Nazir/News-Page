import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const API_KEY = import.meta.env.VITE_API_KEY;
console.log("api key ==============> ", API_KEY)

// const API_KEY = '30981e6a1cb64de7be1330abccb3bbea'; 


function Search() {
  const [articles, setArticles] = useState([]); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [totalResults, setTotalResults] = useState(0); 
  
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('q'); 

  const articlesPerPage = 10;
  const maxPagesToShow = 10;

  const totalPages = Math.min(Math.ceil(totalResults / articlesPerPage), maxPagesToShow);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  useEffect(() => {
    if (searchQuery) {
      setLoading(true); 
      
      fetch(`https://newsapi.org/v2/everything?q=${searchQuery}&page=${currentPage}&pageSize=${articlesPerPage}&apiKey=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
          setArticles(data.articles || []);
          setTotalResults(data.totalResults || 0);
          console.log("Total Results: ", data.totalResults);
        })
        .catch(err => {
          setError('Failed to load articles: ' + err.message); 
        })
        .finally(() => setLoading(false)); 
    }
  }, [searchQuery, currentPage]); 

  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Search Results for "{searchQuery}"
          </h1>
          {loading && (
            <div className="mt-4 flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          )}
          {error && (
            <p className="mt-4 text-red-500 text-lg">{error}</p>
          )}
        </div>

        {articles.length > 0 ? (
          <>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  {article.urlToImage && (
                    <img 
                      src={article.urlToImage} 
                      alt={article.title}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x200?text=No+Image';
                      }}
                    />
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {article.description || 'No description available'}
                    </p>
                    <a
                      href={article.url}
                      target="_blank"
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
                    >
                      Read more
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-12 space-x-2">
              {getPageNumbers().map(page => (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`px-4 py-2 rounded-md transition-colors duration-300 ${
                    currentPage === page 
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-blue-600 border border-blue-600 hover:bg-blue-50'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          </>
        ) : (
          !loading && (
            <div className="text-center py-12">
              <div className="mx-auto w-24 h-24 text-gray-400 mb-4">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">No articles found</h3>
              <p className="mt-1 text-gray-500">Try a different search term</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Search;


