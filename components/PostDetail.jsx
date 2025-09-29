import React, { useState, useEffect } from 'react';
import moment from 'moment';
import blogService from '../services/blog';

const PostDetail = ({ post }) => {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    // Initialize likes from post data if available
    if (post.likes) {
      setLikes(post.likes);
    }
  }, [post]);

  const handleLike = async () => {
    if (liked) return;
    
    try {
      const response = await blogService.likePost(post.slug);
      setLikes(response.likes);
      setLiked(true);
    } catch (error) {
      console.error('Failed to like post:', error);
    }
  };

  const getContentFragment = (index, text, obj, type) => {
    let modifiedText = text;

    if (obj) {
      if (obj.bold) {
        modifiedText = (<b key={index}>{text}</b>);
      }

      if (obj.italic) {
        modifiedText = (<em key={index}>{text}</em>);
      }

      if (obj.underline) {
        modifiedText = (<u key={index}>{text}</u>);
      }
    }

    switch (type) {
      case 'heading-three':
        return <h3 key={index} className="text-xl font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h3>;
      case 'paragraph':
        return <p key={index} className="mb-8">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</p>;
      case 'heading-four':
        return <h4 key={index} className="text-md font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h4>;
      case 'image':
        // Provide fallback for image src
        const imageUrl = obj.src || 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80';
        return (
          <img
            key={index}
            alt={obj.title || 'Content image'}
            height={obj.height || 'auto'}
            width={obj.width || '100%'}
            src={imageUrl}
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80';
            }}
            className="rounded-lg"
          />
        );
      default:
        return modifiedText;
    }
  };

  // Handle cases where post.content might be undefined or malformed
  const renderContent = () => {
    // More robust checking for content structure
    if (!post || !post.content) {
      return <p>Content not available</p>;
    }

    // Handle case where content is directly provided (not in raw format)
    if (typeof post.content === 'string') {
      return <div dangerouslySetInnerHTML={{ __html: post.content }} />;
    }

    // Handle case where content is in raw format
    if (post.content.raw && Array.isArray(post.content.raw.children)) {
      return post.content.raw.children.map((typeObj, index) => {
        // Skip if typeObj or its children are missing
        if (!typeObj || !Array.isArray(typeObj.children)) {
          return null;
        }

        const children = typeObj.children.map((item, itemindex) => 
          getContentFragment(itemindex, item.text, item)
        ).filter(Boolean); // Remove any null/undefined fragments

        return getContentFragment(index, children, typeObj, typeObj.type);
      }).filter(Boolean); // Remove any null/undefined content blocks
    }

    // Fallback for any other content structure
    return <p>Content not available</p>;
  };

  // Handle case where post data is missing entirely
  if (!post) {
    return <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8">Post not found</div>;
  }

  // Fallback URLs for images
  const featuredImageUrl = post.featuredImage?.url || 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80';
  const authorPhotoUrl = post.author?.photo?.url || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80';

  return (
    <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
      <div className="relative overflow-hidden shadow-md mb-6 rounded-t-lg">
        <img  
          src={featuredImageUrl} 
          alt={post.title || 'Blog post image'} 
          className="object-top h-full w-full object-cover shadow-lg rounded-t-lg" 
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80';
          }}
        />
      </div>
      <div className="px-4 lg:px-0">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 w-full space-y-4 md:space-y-0">
          <div className="flex items-center w-full md:w-auto">
            <img
              alt={post.author?.name || 'Author'}
              height="30"
              width="30"
              className="align-middle rounded-full"
              src={authorPhotoUrl}
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80';
              }}
            />
            <p className="inline align-middle text-gray-700 ml-2 font-medium text-lg">{post.author?.name || 'Unknown Author'}</p>
          </div>

          <div className="flex items-center font-medium text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="align-middle">{moment(post.createdAt).format('MMM DD, YYYY')}</span>
          </div>

          <div className="flex items-center">
            <button 
              onClick={handleLike}
              disabled={liked}
              className={`flex items-center ${liked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill={liked ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={liked ? 0 : 2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span>{likes > 0 ? likes : ''}</span>
            </button>
          </div>
        </div>
        <h1 className="mb-8 text-3xl font-semibold">{post.title || 'Untitled Post'}</h1>
        {renderContent()}
      </div>
    </div>
  );
};

export default PostDetail;