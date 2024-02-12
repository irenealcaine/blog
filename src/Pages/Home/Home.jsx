import React, { useEffect, useState } from 'react'
import './Home.css'
import { Link } from 'react-router-dom'
import { collection, onSnapshot } from "firebase/firestore";
import { db } from '../../Firebase/firebase-config'

const Home = () => {

  const [data, setData] = useState([]);

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
    const unsub = onSnapshot(collection(db, 'posts'), (snapShot) => {
      let list = [];
      snapShot.docs.forEach(
        (doc) => {
          list.push({
            id: doc.id,
            ...doc.data()
          });
          list.sort(comparar)
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
    </>
  )
}

export default Home
