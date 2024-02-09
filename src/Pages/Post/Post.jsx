import React, { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from '../../Firebase/firebase-config';

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
    <div>
      <header>
        <Link to={'/'}>../</Link>
        <p>{post?.date}</p>
      </header>
      <h1>{post?.title}</h1>
      <div dangerouslySetInnerHTML={myHTML} />

    </div>
  );
}

export default Post;
