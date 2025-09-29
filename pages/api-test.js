import React, { useState, useEffect } from 'react';
import { getPosts, getCategories } from '../services';

const ApiTestPage = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const postsData = await getPosts();
        const categoriesData = await getCategories();
        
        setPosts(postsData);
        setCategories(categoriesData);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">API Test Page</h1>
      
      {loading && (
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
          <p className="text-blue-700">Loading data from API...</p>
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
          <p className="text-red-700">Error: {error}</p>
        </div>
      )}
      
      {!loading && !error && (
        <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-4">
          <p className="text-green-700">✅ Successfully connected to the backend API!</p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Posts</h2>
          {posts.length > 0 ? (
            <ul className="space-y-2">
              {posts.slice(0, 5).map((post) => (
                <li key={post.node.id} className="border-b pb-2">
                  <strong>{post.node.title}</strong>
                  <p className="text-gray-600 text-sm">{post.node.excerpt}</p>
                </li>
              ))}
              {posts.length > 5 && (
                <li className="text-gray-500">... and {posts.length - 5} more posts</li>
              )}
            </ul>
          ) : (
            <p>No posts found</p>
          )}
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Categories</h2>
          {categories.length > 0 ? (
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.slug} className="border-b pb-2">
                  {category.name} ({category.slug})
                </li>
              ))}
            </ul>
          ) : (
            <p>No categories found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApiTestPage;