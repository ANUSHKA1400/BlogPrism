import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import { FeaturedPostCard } from '../components';
import { getFeaturedPosts } from '../services';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 768, min: 640 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1,
  },
};

const FeaturedPosts = () => {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  // Function to validate and normalize post data
  const validatePostData = (post) => {
    // Handle case where post might be wrapped in a node object
    const postData = post?.node || post;
    
    // Ensure post has required properties with fallbacks
    return {
      id: postData?.id || Math.random().toString(36).substr(2, 9),
      title: postData?.title || 'Untitled Post',
      slug: postData?.slug || '#',
      createdAt: postData?.createdAt || new Date().toISOString(),
      featuredImage: {
        url: postData?.featuredImage?.url || 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80'
      },
      author: {
        name: postData?.author?.name || 'Unknown Author',
        photo: {
          url: postData?.author?.photo?.url || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80'
        }
      }
    };
  };

  useEffect(() => {
    getFeaturedPosts().then((result) => {
      // Ensure we have valid data before setting state
      if (Array.isArray(result)) {
        // Validate each post in the array
        const validatedPosts = result
          .filter(post => post !== null && post !== undefined) // Filter out null/undefined posts
          .map(validatePostData);
        setFeaturedPosts(validatedPosts);
      } else {
        console.warn('Featured posts data is not an array:', result);
        setFeaturedPosts([]);
      }
      setDataLoaded(true);
    }).catch(error => {
      console.error('Error fetching featured posts:', error);
      setFeaturedPosts([]);
      setDataLoaded(true);
    });
  }, []);

  // Create custom arrows without passing carouselState
  const CustomLeftArrow = ({ onClick }) => (
    <div className="absolute arrow-btn left-0 text-center py-3 cursor-pointer bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transform -translate-y-1/2 top-1/2 shadow-lg" onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
    </div>
  );

  const CustomRightArrow = ({ onClick }) => (
    <div className="absolute arrow-btn right-0 text-center py-3 cursor-pointer bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transform -translate-y-1/2 top-1/2 shadow-lg" onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    </div>
  );

  // Only render carousel when data is loaded and we have posts
  if (!dataLoaded) {
    return <div className="mb-8"><div className="card p-6 mb-8 text-center rounded-xl">Loading featured posts...</div></div>;
  }

  if (featuredPosts.length === 0) {
    return <div className="mb-8"><div className="card p-6 mb-8 text-center rounded-xl">No featured posts available.</div></div>;
  }

  return (
    <div className="mb-8">
      <div className="card p-6 mb-8 rounded-xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Featured Posts</h2>
        <div className="relative">
          <Carousel 
            infinite 
            customLeftArrow={<CustomLeftArrow />}
            customRightArrow={<CustomRightArrow />}
            responsive={responsive} 
            itemClass="px-4"
          >
            {featuredPosts.map((post, index) => (
              <FeaturedPostCard key={post.slug || post.id || index} post={post} />
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPosts;