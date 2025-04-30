import React, { useEffect, useState } from 'react';

const categories = [
  'general', 'business', 'entertainment', 'health', 'science',
  'sports', 'technology'
];

function Category() {
  const [articles, setArticles] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('general');

  useEffect(() => {
    setLoading(true);

    Promise.all(
      categories.map((category) =>
        fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=30981e6a1cb64de7be1330abccb3bbea`)
          .then((res) => {
            if (!res.ok) {
              throw new Error(`Failed to fetch data for category: ${category}`);
            }
            return res.json();
          })
          .then((data) => ({
            category,
            articles: data.articles || [], 
          }))
          .catch((error) => ({ category, error: error.message })) 
      )
    )
      .then((results) => {
        const articlesByCategory = results.reduce((acc, { category, articles, error }) => {
          if (error) {
            console.error(`Error in category ${category}: ${error}`);
            acc[category] = []; 
          } else {
            acc[category] = articles;
          }
          return acc;
        }, {});
        setArticles(articlesByCategory);
      })
      .catch((err) => console.log('Overall error:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">News by Category</h1>

      {loading && <p className="text-center">Loading...</p>}

      <div className="flex flex-wrap gap-4 justify-center my-8">
        {categories.map((category, i) => (
          <button
            key={i}
            onClick={() => setSelectedCategory(category)}
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
        <div>
          <h2 className="text-xl font-semibold text-blue-700 mb-4">
            {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
          </h2>
          <div className="grid md:grid-cols-3 gap-4 mt-4">
            {articles[selectedCategory] && articles[selectedCategory].length > 0 ? (
              articles[selectedCategory].map((article, idx) => (
                <div key={idx} className="border rounded-md p-4 shadow">
                  {article.urlToImage && (
                    <img
                      src={article.urlToImage}
                      alt="Article"
                      className="w-full h-48 object-cover rounded mb-3"
                    />
                  )}
                  <h3 className="font-semibold text-lg">{article.title}</h3>
                  <p className="text-sm text-gray-700 mb-2">{article.description}</p>
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
              <p>No articles available for this category.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Category;
