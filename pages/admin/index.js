import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import authService from '../../services/auth';
import blogService from '../../services/blog';
import { RichTextEditor } from '../../components';

const AdminDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    excerpt: '',
    content: '',
    featuredImage: '',
    categories: []
  });
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in and is admin
    if (!authService.isLoggedIn() || !authService.isAdmin()) {
      router.push('/login');
      return;
    }

    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const allPosts = await blogService.getAllPosts();
      setPosts(allPosts);
    } catch (err) {
      setError('Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async () => {
    if (!newPost.title || !newPost.content) {
      setError('Title and content are required');
      return;
    }

    try {
      await blogService.createPost(newPost);
      setIsCreating(false);
      setNewPost({
        title: '',
        excerpt: '',
        content: '',
        featuredImage: '',
        categories: []
      });
      fetchPosts(); // Refresh the posts list
    } catch (err) {
      setError('Failed to create post');
    }
  };

  const handleDeletePost = async (slug) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      await blogService.deletePost(slug);
      fetchPosts(); // Refresh the posts list
    } catch (err) {
      setError('Failed to delete post');
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-10 py-8">
        <div className="card p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-10 py-8">
      <div className="card p-8 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <button 
            onClick={() => setIsCreating(!isCreating)}
            className="btn btn-primary"
          >
            {isCreating ? 'Cancel' : 'Create New Post'}
          </button>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4 mb-6">
            <div className="text-sm text-red-700">{error}</div>
          </div>
        )}

        {isCreating && (
          <div className="card p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Create New Post</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={newPost.title}
                  onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                  className="form-input w-full"
                  placeholder="Post title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
                <textarea
                  value={newPost.excerpt}
                  onChange={(e) => setNewPost({...newPost, excerpt: e.target.value})}
                  className="form-input w-full"
                  placeholder="Post excerpt"
                  rows="3"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Featured Image URL</label>
                <input
                  type="text"
                  value={newPost.featuredImage}
                  onChange={(e) => setNewPost({...newPost, featuredImage: e.target.value})}
                  className="form-input w-full"
                  placeholder="Image URL"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                <RichTextEditor
                  value={newPost.content}
                  onChange={(content) => setNewPost({...newPost, content})}
                  placeholder="Write your post content here..."
                />
              </div>
              
              <div className="mt-4">
                <button 
                  onClick={handleCreatePost}
                  className="btn btn-primary"
                >
                  Publish Post
                </button>
              </div>
            </div>
          </div>
        )}

        <h2 className="text-2xl font-bold text-gray-800 mb-4">All Posts</h2>
        {posts.length === 0 ? (
          <p>No posts found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {posts.map((post) => (
                  <tr key={post.node.slug}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{post.node.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{post.node.author.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(post.node.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link href={`/admin/edit/${post.node.slug}`}>
                        <span className="text-blue-600 hover:text-blue-900 cursor-pointer mr-4">Edit</span>
                      </Link>
                      <button
                        onClick={() => handleDeletePost(post.node.slug)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;