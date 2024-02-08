import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from '../../Firebase/firebase-config';

const Post = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const q = query(collection(db, "posts"), where("slug", "==", slug));
        const querySnapshot = await getDocs(q);
        const fetchedPost = querySnapshot.docs[0]?.data();

        if (fetchedPost) {
          setPost({ id: querySnapshot.docs[0].id, ...fetchedPost });
          // console.log('va')
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (slug) {
      fetchPost();
    }
  }, [slug]);

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
