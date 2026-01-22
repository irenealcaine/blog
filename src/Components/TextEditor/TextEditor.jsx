import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { db } from '../../Firebase/firebase-config';
import { collection, addDoc, Timestamp, doc, getDoc, updateDoc } from "firebase/firestore";
import { Link, useNavigate, useParams } from 'react-router-dom';
import './TextEditor.css'
import Button from '../Button/Button';
import Input from '../Input/Input';

const TextEditor = ({ editMode = false }) => {

  const [value, setValue] = useState('');
  const [titleValue, setTitleValue] = useState('');
  const [slugValue, setSlugValue] = useState('');
  const [postId, setPostId] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  // Cargar datos del post si estamos en modo edición
  useEffect(() => {
    if (editMode && id) {
      const fetchPost = async () => {
        setLoading(true);
        try {
          const docRef = doc(db, "posts", id);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            const postData = docSnap.data();
            setTitleValue(postData.title || '');
            setSlugValue(postData.slug || '');
            setValue(postData.content || '');
            setPostId(id);
          } else {
            console.log("No se encontró el post");
            navigate('/404');
          }
        } catch (error) {
          console.error('Error al cargar el post:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchPost();
    }
  }, [editMode, id, navigate]);

  const modules = {
    toolbar: [
      [{ 'header': [2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      ['link', 'blockquote', 'code', 'code-block'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }]
    ],
  }

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'link', 'blockquote', 'code', 'code-block',
    'list', 'bullet'
  ]

  const handleSubmit = async () => {
    try {
      if (editMode && postId) {
        // Actualizar post existente
        const docRef = doc(db, "posts", postId);
        await updateDoc(docRef, {
          title: titleValue,
          slug: slugValue,
          content: value,
          updatedAt: Timestamp.now().toDate()
        });
        navigate(`/${slugValue}`);
      } else {
        // Crear nuevo post
        await addDoc(collection(db, "posts"), {
          title: titleValue,
          slug: slugValue,
          content: value,
          date: Timestamp.now().toDate()
        });
        setValue('');
        navigate('/');
      }
    } catch (error) {
      console.error('Error al guardar el post:', error);
    }
  };

  return (
    <div className='text-editor'>

      <Link to={'/'}>../</Link>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <>
          <Input
            type={'text'}
            placeholder={'Título'}
            value={titleValue}
            onChange={(e) => setTitleValue(e.target.value)}
          />

          <Input
            type={'text'}
            placeholder={'Slug'}
            value={slugValue}
            onChange={(e) => setSlugValue(e.target.value)}
          />

          <ReactQuill
            theme="snow"
            modules={modules}
            formats={formats}
            value={value}
            onChange={setValue} />

          <Button className="submit-button" onClick={handleSubmit} value={editMode ? 'Actualizar' : 'Enviar'} />
        </>
      )}

    </div>
  )
}

export default TextEditor
