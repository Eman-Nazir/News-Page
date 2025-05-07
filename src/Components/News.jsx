import React, { useState, useEffect } from 'react';

const News = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 9;

  useEffect(() => {
    fetch(`https://newsapi.org/v2/everything?q=ethereum&apiKey=30981e6a1cb64de7be1330abccb3bbea`)
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

  if (loading) return <p className="font-bold text-2xl">Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 py-10 px-5">
      <h1 className="text-3xl font-bold mb-8">Latest News</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-10">
        {currentArticles.map((article, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden w-full max-w-sm mx-auto transform hover:-translate-y-2"
          >
            {article.urlToImage ? (
              <img src={article.urlToImage} alt={article.title} className="w-full h-60 object-cover" />
            ) : (
              <div className="w-full h-60 bg-gray-300 flex items-center justify-center text-gray-700">
                No Image
              </div>
            )}
            <div className="p-6 flex flex-col justify-between h-60">
              <div>
                <h2 className="text-lg font-bold text-blue-800 mb-2 line-clamp-2">{article.title}</h2>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {article.description || 'No description available.'}
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-xs line-clamp-2">
                  By {article.author || 'Unknown'} | {new Date(article.publishedAt).toLocaleDateString()}
                </p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block bg-blue-600 text-white text-center px-4 py-2 rounded-full text-sm hover:bg-blue-700 w-full"
                >
                  Read Full Article
                </a>
              </div>
            </div>
          </div>
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


