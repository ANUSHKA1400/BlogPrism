import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getCategories } from '../services';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((newCategories) => {
      setCategories(newCategories);
    });
  }, []);

  return (
    <div className="card p-8 pb-12 mb-8 rounded-xl">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4 text-gray-800 text-center">
        Categories
      </h3>
      <div className="flex flex-col space-y-3">
        {categories.map((category, index) => (
          <Link key={category.slug} href={`/category/${category.slug}`}>
            <span className={`cursor-pointer transition-colors duration-300 hover:text-blue-600 text-gray-700 text-center py-2 px-4 rounded-lg hover:bg-gray-100 ${index !== categories.length - 1 ? 'border-b border-gray-200' : ''}`}>
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;