import React, { useEffect, useState } from 'react'
import './Home.css'
import { Link } from 'react-router-dom'
import { collection, onSnapshot } from "firebase/firestore";
import { db } from '../../Firebase/firebase-config'
import Loader from '../../Components/Loader/Loader';

const Home = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

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
      <div className="blog-container">
        <h1>/blog</h1>
        {loading && <Loader />}
        {error && <h2>error: No hay posts</h2>}
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
