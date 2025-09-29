import React from 'react';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';

const FeaturedPostCard = ({ post }) => {
  // Additional safety check for post object
  if (!post) {
    return null;
  }

  // Ensure we have valid data with proper fallbacks
  const title = post?.title || 'Untitled Post';
  const slug = post?.slug || '#';
  const createdAt = post?.createdAt || new Date().toISOString();
  
  // Fallback image URLs in case the images are missing
  const featuredImageUrl = post?.featuredImage?.url || 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80';
  const authorName = post?.author?.name || 'Unknown Author';
  const authorPhotoUrl = post?.author?.photo?.url || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80';
  
  // Additional safety check for image URLs to ensure they are valid strings
  const validFeaturedImageUrl = featuredImageUrl && typeof featuredImageUrl === 'string' && featuredImageUrl.length > 0 
    ? featuredImageUrl 
    : 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80';
    
  const validAuthorPhotoUrl = authorPhotoUrl && typeof authorPhotoUrl === 'string' && authorPhotoUrl.length > 0 
    ? authorPhotoUrl 
    : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80';

  return (
    <div className="relative h-72 rounded-xl overflow-hidden shadow-lg">
      <div 
        className="absolute rounded-xl bg-center bg-no-repeat bg-cover shadow-md inline-block w-full h-72" 
        style={{ backgroundImage: `url('${validFeaturedImageUrl}')` }} 
      />
      <div className="absolute rounded-xl bg-center bg-gradient-to-b opacity-70 from-gray-400 via-gray-700 to-black w-full h-72" />
      <div className="flex flex-col rounded-xl p-4 items-center justify-center absolute w-full h-full">
        <p className="text-white mb-4 text-shadow font-semibold text-xs">{moment(createdAt).format('MMM DD, YYYY')}</p>
        <p className="text-white mb-4 text-shadow font-semibold text-xl text-center px-2">{title}</p>
        <div className="flex items-center absolute bottom-5 w-full justify-center">
          <Image
            unoptimized
            alt={authorName}
            height={30}
            width={30}
            className="align-middle drop-shadow-lg rounded-full"
            src={validAuthorPhotoUrl}
            // Added onError handler as an additional safety measure
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80';
            }}
          />
          <p className="inline align-middle text-white text-shadow ml-2 font-medium text-sm">{authorName}</p>
        </div>
      </div>
      <Link href={`/post/${slug}`}>
        <span className="cursor-pointer absolute w-full h-full" />
      </Link>
    </div>
  );
};

export default FeaturedPostCard;