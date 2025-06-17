import React, { useEffect, useState } from 'react';

const categories = [
  'general', 'business', 'entertainment', 'health', 'science',
  'sports', 'technology'
];

const API_KEY = '30981e6a1cb64de7be1330abccb3bbea';

function Category() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0); 
  const articlesPerPage = 6;

  useEffect(() => {
    setLoading(true);

    fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${selectedCategory}&page=${currentPage}&pageSize=${articlesPerPage}&apiKey=${API_KEY}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch');
        }
        return res.json();
      })
      .then((data) => {
        const total = data.totalResults || 0;
        setArticles(data.articles || []);
        setTotalResults(total); 
        setTotalPages(Math.ceil(total / articlesPerPage));

        console.clear();
        console.log(`Category: ${selectedCategory}`);
        console.log(`Total Articles: ${total}`);
        console.log(`Articles Per Page: ${articlesPerPage}`);
        console.log(`Total Pages: ${Math.ceil(total / articlesPerPage)}`);
        console.log(`Current Page: ${currentPage}`);
        console.log(`Articles on This Page: ${data.articles.length}`);
      })
      .catch((error) => {
        console.error('Error fetching articles:', error);
        setArticles([]);
        setTotalPages(1);
        setTotalResults(0);
      })
      .finally(() => setLoading(false));
  }, [selectedCategory, currentPage]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">News by Category</h1>

      {loading && <p className="text-center">Loading...</p>}

      <div className="flex flex-wrap gap-4 justify-center my-8">
        {categories.map((category, i) => (
          <button
            key={i}
            onClick={() => {
              setSelectedCategory(category);
              setCurrentPage(1);
            }}
            className={`px-6 py-2 rounded-full border font-semibold text-sm transition-all duration-300
              ${selectedCategory === category
                ? 'bg-blue-700 text-white border-blue-700'
                : 'border-blue-600 text-blue-700 hover:bg-blue-700 hover:text-white'}`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      <div className="mt-8">
      

        

        <div className="grid md:grid-cols-3 gap-4 mt-4">
          {articles.length > 0 ? (
            articles.map((article, idx) => (
              <div key={idx} className="border rounded-md p-4 shadow">
                {article.urlToImage && (
                  <img
                    src={article.urlToImage}
                    alt="Article"
                    className="w-full h-48 object-cover rounded mb-3"
                  />
                )}
                <h3 className="font-semibold text-lg line-clamp-2">{article.title}</h3>
                <p className="text-sm text-gray-700 mb-2 line-clamp-2">{article.description}</p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600"
                >
                  Read more
                </a>
              </div>
            ))
          ) : (
            <p className="text-center col-span-3">No articles available for this category.</p>
          )}
        </div>

        <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 rounded border
                ${currentPage === page
                  ? 'bg-blue-700 text-white border-blue-700'
                  : 'bg-white text-blue-700 border-blue-500 hover:bg-blue-100'}`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Category;
