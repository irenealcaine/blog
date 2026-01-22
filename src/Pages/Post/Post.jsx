import React, { useEffect, useState } from 'react'
import { Link, Navigate, useParams, useNavigate } from 'react-router-dom'
import { getDocs, collection, query, where, deleteDoc, doc } from "firebase/firestore";
import { db } from '../../Firebase/firebase-config';
import './Post.css'
import Loader from '../../Components/Loader/Loader';
import { UserAuth } from '../../Context/AuthContext';
import Button from '../../Components/Button/Button';

// import Prism from 'prismjs';
// import 'prismjs/themes/prism.css';
// import 'prismjs/themes/prism-tomorrow.css'

const Post = () => {

  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [redirectToErrorPage, setRedirectToErrorPage] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = UserAuth();
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (window.confirm(`¿Estás segura de que quieres borrar el post "${post?.title}"?`)) {
      try {
        await deleteDoc(doc(db, "posts", post.id));
        navigate('/');
      } catch (error) {
        console.error('Error al borrar el post:', error);
        alert('Error al borrar el post');
      }
    }
  };

  useEffect(() => {
    setLoading(true)
    const fetchPost = async () => {
      try {
        const q = query(collection(db, "posts"), where("slug", "==", slug));
        const querySnapshot = await getDocs(q);
        const fetchedPost = querySnapshot.docs[0]?.data();

        if (fetchedPost) {
          setLoading(false)
          setPost({ id: querySnapshot.docs[0].id, ...fetchedPost });
        } else {
          console.log('No hay post con este slug')
          setRedirectToErrorPage(true);
        }
      } catch (error) {
        console.error(error);
        setRedirectToErrorPage(true);
      }
    };
    if (slug) {
      fetchPost();
    }

    // Prism.highlightAll();

  }, [slug]);

  if (redirectToErrorPage) {
    return <Navigate to="/404" replace />;
  }

  const myHTML = {
    __html: post?.content
  };


  return (
    <div className='post'>

      <header>
        <Link to={'/'}>../</Link>
        <p>{post?.date?.toDate().toLocaleDateString()}</p>
      </header>
      {loading && <Loader />}
      <div className="post-content">
        <h1>{post?.title}</h1>
        <div dangerouslySetInnerHTML={myHTML} />
      </div>
      
      {user && post && (
        <div className="post-actions">
          <Link to={`/edit-post/${post.id}`}>
            <Button value={'Editar post'} />
          </Link>
          <button 
            onClick={handleDelete}
            className="delete-button" 
            title="Borrar post"
          >
            Borrar post
          </button>
        </div>
      )}

    </div>
  );
}

export default Post;
