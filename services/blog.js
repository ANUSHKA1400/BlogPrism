const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

class BlogService {
  // Get all posts
  async getAllPosts() {
    if (!apiBaseUrl) {
      // Fallback to mock implementation
      const { getPosts } = require('./index');
      return await getPosts();
    }
    
    // Real API implementation
    try {
      const response = await fetch(`${apiBaseUrl}/posts`);
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      const posts = await response.json();
      return posts.map(post => ({ node: post }));
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch posts');
    }
  }

  // Get post by slug
  async getPostBySlug(slug) {
    if (!apiBaseUrl) {
      // Fallback to mock implementation
      const { getPostDetails } = require('./index');
      return await getPostDetails(slug);
    }
    
    // Real API implementation
    try {
      const response = await fetch(`${apiBaseUrl}/posts/${slug}`);
      if (!response.ok) {
        throw new Error('Failed to fetch post');
      }
      const post = await response.json();
      
      // Transform the response to match the expected structure
      return {
        ...post,
        content: {
          raw: {
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    text: post.content || 'Content not available'
                  }
                ]
              }
            ]
          }
        }
      };
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch post');
    }
  }

  // Create a new post
  async createPost(postData) {
    if (!apiBaseUrl) {
      // Fallback to mock implementation
      return new Promise((resolve) => {
        setTimeout(() => {
          const newPost = {
            id: Date.now().toString(),
            ...postData,
            createdAt: new Date().toISOString(),
            slug: postData.title.toLowerCase().replace(/\s+/g, '-'),
          };
          resolve(newPost);
        }, 1000);
      });
    }
    
    // Real API implementation
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${apiBaseUrl}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(postData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create post');
      }
      
      const newPost = await response.json();
      return newPost;
    } catch (error) {
      throw new Error(error.message || 'Failed to create post');
    }
  }

  // Update a post
  async updatePost(slug, postData) {
    if (!apiBaseUrl) {
      // Fallback to mock implementation
      return new Promise((resolve) => {
        setTimeout(() => {
          const updatedPost = {
            id: slug,
            ...postData,
            updatedAt: new Date().toISOString(),
          };
          resolve(updatedPost);
        }, 1000);
      });
    }
    
    // Real API implementation
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${apiBaseUrl}/posts/${slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(postData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update post');
      }
      
      const updatedPost = await response.json();
      return updatedPost;
    } catch (error) {
      throw new Error(error.message || 'Failed to update post');
    }
  }

  // Delete a post
  async deletePost(slug) {
    if (!apiBaseUrl) {
      // Fallback to mock implementation
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ success: true });
        }, 1000);
      });
    }
    
    // Real API implementation
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${apiBaseUrl}/posts/${slug}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete post');
      }
      
      return { success: true };
    } catch (error) {
      throw new Error(error.message || 'Failed to delete post');
    }
  }

  // Search posts
  async searchPosts(query) {
    if (!apiBaseUrl) {
      // Fallback to mock implementation
      const posts = await this.getAllPosts();
      const filteredPosts = posts.filter(post => 
        post.node.title.toLowerCase().includes(query.toLowerCase()) ||
        post.node.excerpt.toLowerCase().includes(query.toLowerCase())
      );
      return filteredPosts;
    }
    
    // Real API implementation
    try {
      const response = await fetch(`${apiBaseUrl}/search?q=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error('Failed to search posts');
      }
      const posts = await response.json();
      return posts.map(post => ({ node: post }));
    } catch (error) {
      throw new Error(error.message || 'Failed to search posts');
    }
  }

  // Like a post
  async likePost(slug) {
    if (!apiBaseUrl) {
      // Fallback to mock implementation
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ likes: Math.floor(Math.random() * 100) + 1 });
        }, 500);
      });
    }
    
    // Real API implementation
    try {
      const response = await fetch(`${apiBaseUrl}/posts/${slug}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to like post');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error.message || 'Failed to like post');
    }
  }
}

export default new BlogService();