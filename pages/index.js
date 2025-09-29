// import type { NextPage } from 'next'
import Head from 'next/head';
// import Image from 'next/image'
import { PostCard, Categories, PostWidget } from '../components';
import { getPosts } from '../services';
import {FeaturedPosts} from '../sections';

export default function Home() {
  return <div>Hello World</div>;
}

// To fetch data at build time
export async function getStaticProps() {
  const posts = (await getPosts()) || [];
  return {
    props: { posts },
  };
}