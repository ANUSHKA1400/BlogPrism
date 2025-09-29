import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Link from 'next/link';
import { getSimilarPosts, getRecentPosts } from '../services';

const PostWidget = ({ categories, slug }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    if (slug) {
      getSimilarPosts(categories, slug)
      .then((result) => {
        setRelatedPosts(result);
      });
    } else {
      getRecentPosts()
      .then((result) => {
        setRelatedPosts(result);
      });
    }
  }, [slug]);

  // Function to validate post data and provide fallbacks
  const validatePostData = (post) => {
    // Handle case where post might be wrapped in a node object
    const postData = post?.node || post;
    
    return {
      ...postData,
      title: postData?.title || 'Untitled Post',
      slug: postData?.slug || '#',
      createdAt: postData?.createdAt || new Date().toISOString(),
      featuredImage: {
        url: postData?.featuredImage?.url || 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80'
      }
    };
  };

  // Validate all posts before rendering
  const validatedPosts = relatedPosts.map(validatePostData);

  return (
    <div className="card p-8 pb-12 mb-8 rounded-xl">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4 text-gray-800 text-center">
        {slug ? 'Related Posts' : 'Recent Posts'}
      </h3>
      <div className="space-y-4">
        {validatedPosts.map((post, index) => (
          <div key={post.slug || post.title || index} className="flex items-center w-full">
            <div className="w-16 flex-none">
              <img
                alt={post.title}
                height="60"
                width="60"
                className="align-middle rounded-full object-cover"
                src={post.featuredImage.url}
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80';
                }}
              />
            </div>
            <div className="flex-grow ml-4">
              <p className="text-gray-500 text-sm">
                {moment(post.createdAt).format('MMM DD, YYYY')}
              </p>
              <Link 
                href={`/post/${post.slug}`} 
                className="text-md transition-colors duration-300 hover:text-blue-600 text-gray-700 font-medium"
              >
                {post.title}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostWidget;