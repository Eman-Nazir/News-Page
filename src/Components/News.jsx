
import React, { useState, useEffect } from 'react';
import Card from './Card'; 

const API_KEY = import.meta.env.VITE_API_KEY;

const News = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 9;

  useEffect(() => {
    fetch(`https://newsapi.org/v2/everything?q=ethereum&apiKey=${API_KEY}`)
      .then(response => response.json())
      .then(data => {
        setArticles(data.articles || []);
        setLoading(false);
      })
      .catch(err => {
        setError('Error fetching data: ' + err.message);
        setLoading(false);
      });
  }, []);

  const totalPages = Math.ceil(articles.length / articlesPerPage);
  const indexOfLast = currentPage * articlesPerPage;
  const indexOfFirst = indexOfLast - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirst, indexOfLast);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) return <p className="font-bold text-2xl py-10 text-center">Loading...</p>;
  if (error) return <p className="text-center py-10">{error}</p>;

  return (
    <div className="bg-gradient-to-br from-blue-100 to-blue-300 py-10 px-5 min-h-screen pb-20">
      <h1 className="text-3xl font-bold mb-8">Latest News</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-10">
        {currentArticles.map((article, index) => (
          <Card key={index} article={article} />  
        ))}
      </div>

      <div className="flex justify-center flex-wrap gap-3 mt-8">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => handlePageClick(i + 1)}
            className={`rounded-md w-10 h-10 text-sm font-medium ${
              currentPage === i + 1
                ? 'bg-blue-600 text-white'
                : 'bg-white border border-blue-600 text-blue-600 hover:bg-blue-100'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default News;


