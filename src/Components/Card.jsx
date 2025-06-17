import React from 'react';
import Dummy from '../assets/images/Dummy.png';

const Card = ({ article }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden w-full max-w-sm mx-auto transform hover:-translate-y-2">
      <img
        src={article.urlToImage ? article.urlToImage : Dummy}
        alt={article.title}
        className="w-full h-60 object-cover"
      />
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
            className="mt-3 inline-block bg-blue-600 text-white text-center px-4 py-2 rounded-full text-sm hover:bg-blue-700 w-full"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read Full Article
          </a>
        </div>
      </div>
    </div>
  );
};

export default Card;

