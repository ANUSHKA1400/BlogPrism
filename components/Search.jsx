import React, { useState } from 'react';
import { useRouter } from 'next/router';
import blogService from '../services/blog';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    try {
      const results = await blogService.searchPosts(searchQuery);
      setSearchResults(results);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResultClick = (slug) => {
    router.push(`/post/${slug}`);
    setSearchQuery('');
    setSearchResults([]);
  };

  return (
    <div className="relative">
      <form onSubmit={handleSearch} className="flex">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search posts..."
          className="form-input rounded-r-none w-64"
        />
        <button 
          type="submit"
          className="btn btn-primary rounded-l-none"
          disabled={isLoading}
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {searchResults.length > 0 && (
        <div className="card absolute top-full left-0 w-full mt-2 z-10 max-h-60 overflow-y-auto">
          {searchResults.map((post) => (
            <div 
              key={post.node.slug}
              className="p-3 border-b border-gray-200 cursor-pointer hover:bg-gray-50"
              onClick={() => handleResultClick(post.node.slug)}
            >
              <h4 className="font-medium text-gray-800">{post.node.title}</h4>
              <p className="text-sm text-gray-600 truncate">{post.node.excerpt}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;