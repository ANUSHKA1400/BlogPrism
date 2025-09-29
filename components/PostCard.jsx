import React from 'react'
import moment from 'moment'
import Link from 'next/link'

const PostCard = ({ post }) => {
  // Fallback URLs in case the images are missing
  const featuredImageUrl = post.featuredImage?.url || 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80';
  const authorPhotoUrl = post.author?.photo?.url || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80';
  
  return (
    <div className="card mb-8 p-0 pb-12 lg:p-8 rounded-xl">
      <div className="relative mb-6 overflow-hidden pb-80 shadow-md rounded-t-xl">
        <img 
          src={featuredImageUrl} 
          alt={post.title || 'Blog post image'}
          className="object-top absolute h-80 w-full object-cover shadow-lg rounded-t-xl" 
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80';
          }}
        />
      </div>

      <h1 className="transition duration-300 text-center mb-8 cursor-pointer hover:text-blue-600 text-3xl font-semibold">
        <Link href={`/post/${post.slug}`}>
          {post.title || 'Untitled Post'}
        </Link>
      </h1>
      
      <div className="flex flex-col md:flex-row items-center justify-center mb-8 w-full space-y-4 md:space-y-0 md:space-x-8">
        <div className="flex items-center justify-center w-full md:w-auto">
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
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="align-middle">{moment(post.createdAt).format('MMM DD, YYYY')}</span>
        </div>
      </div>
      
      <p className="text-center text-lg text-gray-700 font-normal px-4 lg:px-20 mb-8">
        {post.excerpt || 'No excerpt available'}
      </p>
      
      <div className="text-center">
        <Link href={`/post/${post.slug}`}>
          <span className="transition duration-300 ease transform hover:-translate-y-1 inline-block bg-gradient-to-r from-blue-500 to-indigo-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer hover:from-blue-600 hover:to-indigo-700">
            Continue Reading
          </span>
        </Link>
      </div>
    </div>
  )
}

export default PostCard