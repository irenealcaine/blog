import React, { useEffect, useRef, useState } from 'react'
import { posts } from '../../assets/data/examplePosts'
import './Home.css'
import { Link } from 'react-router-dom'
import TextEditor from '../../Components/TextEditor/TextEditor'
import { collection, deleteDoc, doc, onSnapshot, Timestamp } from "firebase/firestore";
import { db } from '../../Firebase/firebase-config'

const Home = () => {

  const [data, setData] = useState([]);

  // useEffect(() => {
  //   const docRef = doc(db, "cities", "SF");
  //   const docSnap = await getDoc(docRef);

  //   if (docSnap.exists()) {
  //     console.log("Document data:", docSnap.data());
  //   } else {
  //     // docSnap.data() will be undefined in this case
  //     console.log("No such document!");
  //   }
  // }, [])

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'posts'), (snapShot) => {
      let list = [];
      snapShot.docs.forEach(
        (doc) => {
          list.push({
            id: doc.id,
            ...doc.data()
          });
          setData(list);
        },
        (error) => {
          console.log(error);
        }
      );
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <>
      <div className="blog-container">
        <h1>/blog</h1>
        {data.map((post) => (
          <div key={post.id} className="blog-card">
            <Link to={`/${post.slug}`}><h2 className="blog-card-slug">/{post.slug}</h2></Link>
          </div>
        ))}
      </div>
      <TextEditor />
    </>
  )
}

export default Home
