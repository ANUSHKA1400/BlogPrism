import React from 'react';
import Image from 'next/image';

// import { grpahCMSImageLoader } from '../util';

const Author = ({ author }) => {
  // Fallback image URL in case the author photo is missing
  const authorPhotoUrl = author?.photo?.url || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80';
  
  // Additional safety check for image URL
  const validAuthorPhotoUrl = authorPhotoUrl && typeof authorPhotoUrl === 'string' && authorPhotoUrl.length > 0 
    ? authorPhotoUrl 
    : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80';
  
  return (
    <div className="text-center mt-20 mb-8 p-12 relative rounded-lg bg-black bg-opacity-20">
      <div className="absolute left-1/2 transform -translate-x-1/2 -top-14">
        <Image
          unoptimized
          // loader={grpahCMSImageLoader}
          alt={author?.name || 'Author'}
          height={100}
          width={100}
          className="align-middle rounded-full border-4 border-white shadow-lg"
          src={validAuthorPhotoUrl}
          // Added onError handler as an additional safety measure
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80';
          }}
        />
      </div>
      <h3 className="text-white mt-16 mb-4 text-xl font-bold">{author?.name || 'Unknown Author'}</h3>
      <p className="text-white text-lg">{author?.bio || 'No bio available'}</p>
    </div>
  );
}

export default Author;