import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import authService from '../../../services/auth';
import blogService from '../../../services/blog';
import { RichTextEditor } from '../../../components';

const EditPost = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    // Check if user is logged in and is admin
    if (!authService.isLoggedIn() || !authService.isAdmin()) {
      router.push('/login');
      return;
    }

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  const fetchPost = async () => {
    try {
      const postData = await blogService.getPostBySlug(slug);
      setPost({
        title: postData.title,
        excerpt: postData.excerpt,
        content: postData.content?.raw || '',
        featuredImage: postData.featuredImage?.url || '',
        categories: postData.categories || []
      });
    } catch (err) {
      setError('Failed to fetch post');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!post.title || !post.content) {
      setError('Title and content are required');
      return;
    }

    setSaving(true);
    try {
      await blogService.updatePost(slug, post);
      router.push('/admin');
    } catch (err) {
      setError('Failed to update post');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-10 py-8">
        <div className="card p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Post</h1>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto px-10 py-8">
        <div className="card p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Post</h1>
          <p>Post not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-10 py-8">
      <div className="card p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Edit Post</h1>
          <div>
            <button 
              onClick={() => router.push('/admin')}
              className="btn btn-secondary mr-2"
            >
              Cancel
            </button>
            <button 
              onClick={handleSave}
              disabled={saving}
              className="btn btn-primary"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4 mb-6">
            <div className="text-sm text-red-700">{error}</div>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={post.title}
              onChange={(e) => setPost({...post, title: e.target.value})}
              className="form-input w-full"
              placeholder="Post title"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
            <textarea
              value={post.excerpt}
              onChange={(e) => setPost({...post, excerpt: e.target.value})}
              className="form-input w-full"
              placeholder="Post excerpt"
              rows="3"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Featured Image URL</label>
            <input
              type="text"
              value={post.featuredImage}
              onChange={(e) => setPost({...post, featuredImage: e.target.value})}
              className="form-input w-full"
              placeholder="Image URL"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
            <RichTextEditor
              value={post.content}
              onChange={(content) => setPost({...post, content})}
              placeholder="Write your post content here..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPost;