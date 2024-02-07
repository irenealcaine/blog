import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { db } from '../../../Firebase/firebase-config';
import { collection, addDoc } from "firebase/firestore";

const TextEditor = () => {

  const [value, setValue] = useState('');

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
    console.log('Intentando enviar a Firestore');
    try {
      await addDoc(collection(db, "posts"), {
        content: value
      });
      console.log('Post guardado en Firestore');
      setValue('');
    } catch (error) {
      console.error('Error al guardar el post:', error);
    }
  };

  return (
    <div>
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
