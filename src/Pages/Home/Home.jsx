import React from 'react'
import { posts } from '../../assets/data/examplePosts'
import './Home.css'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
      <div className="blog-container">
        <h1>/blog</h1>
        {posts.map((post) => (
          <div key={post.id} className="blog-card">
            <Link to={`/${post.slug}`}><h2 className="blog-card-slug">/{post.slug}</h2></Link>
          </div>
        ))}
        git-link-web
      </div>
    </>
  )
}

export default Home
