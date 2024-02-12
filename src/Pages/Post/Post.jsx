import React, { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from '../../Firebase/firebase-config';
import './Post.css'

const Post = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [redirectToErrorPage, setRedirectToErrorPage] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const q = query(collection(db, "posts"), where("slug", "==", slug));
        const querySnapshot = await getDocs(q);
        const fetchedPost = querySnapshot.docs[0]?.data();

        if (fetchedPost) {
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
      <div className="post-content">
        <h1>{post?.title}</h1>
        <div dangerouslySetInnerHTML={myHTML} />
      </div>


    </div>
  );
}

export default Post;
