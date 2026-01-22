import React, { useEffect, useState } from 'react'
import './Home.css'
import { Link } from 'react-router-dom'
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db } from '../../Firebase/firebase-config'
import Loader from '../../Components/Loader/Loader';
import { UserAuth } from '../../Context/AuthContext';

const Home = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const { user } = UserAuth();

  const handleDelete = async (postId, postTitle) => {
    if (window.confirm(`¿Estás segura de que quieres borrar el post "${postTitle}"?`)) {
      try {
        await deleteDoc(doc(db, "posts", postId));
      } catch (error) {
        console.error('Error al borrar el post:', error);
        alert('Error al borrar el post');
      }
    }
  };

  function comparar(a, b) {
    if (a.date < b.date) {
      return 1;
    }
    if (a.date > b.date) {
      return -1;
    }
    return 0;
  }

  useEffect(() => {
    setLoading(true)
    const unsub = onSnapshot(collection(db, 'posts'), (snapShot) => {
      let list = [];
      if (snapShot.docs.length > 0) {
        snapShot.docs.forEach(
          (doc) => {
            list.push({
              id: doc.id,
              ...doc.data()
            });
            setLoading(false)
            list.sort(comparar)
            setData(list);
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        setLoading(false)
        setError(true)
      }

    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <>
      {user && (
        <div className="login-indicator" title="Sesión iniciada">
          <span className="status-dot"></span>
        </div>
      )}
      <div className="blog-container">
        <h1>/blog</h1>
        {loading && <Loader />}
        {error && <h2>error: No hay posts</h2>}
        {data.map((post) => (
          <div key={post.id} className="blog-card">
            <div className="blog-card-content">
              <Link to={`/${post.slug}`}><h2 className="blog-card-slug">/{post.slug}</h2></Link>
              {user && (
                <div className="post-actions">
                  <Link to={`/edit-post/${post.id}`} className="edit-dot-link" title="Editar post">
                    <span className="edit-dot"></span>
                  </Link>
                  <button 
                    onClick={() => handleDelete(post.id, post.title)}
                    className="delete-dot-button" 
                    title="Borrar post"
                  >
                    <span className="delete-dot"></span>
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Home
