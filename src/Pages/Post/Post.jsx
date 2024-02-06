import React from 'react'
import { useParams } from 'react-router-dom'
import { posts } from '../../assets/data/examplePosts';

const Post = () => {
  const { slug } = useParams();
  const postDetails = posts.find((post) => post.slug === slug);

  return (
    <div>
      <h1>{postDetails.title}</h1>
    </div>
  )
}

export default Post
