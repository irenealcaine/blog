import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { db } from '../../Firebase/firebase-config';
import { collection, addDoc, Timestamp } from "firebase/firestore";

const TextEditor = () => {

  const [value, setValue] = useState('');
  const [titleValue, setTitleValue] = useState('');
  const [slugValue, setSlugValue] = useState('');

  const modules = {
    toolbar: [
      [{ 'header': [2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      ['link', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }]
    ],
  }

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'link', 'blockquote',
    'list', 'bullet'
  ]

  const handleSubmit = async () => {
    // console.log('Intentando enviar a Firestore');
    try {
      await addDoc(collection(db, "posts"), {
        title: titleValue,
        slug: slugValue,
        content: value,
        date: Timestamp.now().toDate().toLocaleDateString()
      });
      // console.log('Post guardado en Firestore');
      setValue('');
    } catch (error) {
      console.error('Error al guardar el post:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder='Título'
        value={titleValue}
        onChange={(e) => setTitleValue(e.target.value)}
      />

      <input
        type="text"
        placeholder='Slug'
        value={slugValue}
        onChange={(e) => setSlugValue(e.target.value)}
      />

      <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        value={value}
        onChange={setValue} />

      <button onClick={handleSubmit}>Enviar</button>


    </div>
  )
}

export default TextEditor
