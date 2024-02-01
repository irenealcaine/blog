import './App.css'
import { posts } from './assets/data/examplePosts'

function App() {

  return (
    <>
      <h1>Blog</h1>
      <div className="blog-container">
        {posts.map((post) => (
          <div key={post.id} className="blog-card">
            <img className='blog-card-img' src={post.img} alt={post.title} />
            <div className="blog-card-content">
              <h2 className='blog-card-title'>{post.title}</h2>
              <h3 className='blog-card-subtitle'>{post.subtitle}</h3>
              <p className='blog-card-link'>Leer más</p>
            </div>

          </div>
        ))}
      </div>
    </>
  )
}

export default App
