import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { db } from '../../Firebase/firebase-config';
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { Link, useNavigate } from 'react-router-dom';
import './TextEditor.css'
import Button from '../Button/Button';
import Input from '../Input/Input';

const TextEditor = () => {

  const [value, setValue] = useState('');
  const [titleValue, setTitleValue] = useState('');
  const [slugValue, setSlugValue] = useState('');
  const navigate = useNavigate()

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
      await addDoc(collection(db, "posts"), {
        title: titleValue,
        slug: slugValue,
        content: value,
        date: Timestamp.now().toDate()
      });
      setValue('');
      navigate('/')
    } catch (error) {
      console.error('Error al guardar el post:', error);
    }
  };

  return (
    <div className='text-editor'>

      <Link to={'/'}>../</Link>

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

      <Button onClick={handleSubmit} value={'Enviar'} />

    </div>
  )
}

export default TextEditor
