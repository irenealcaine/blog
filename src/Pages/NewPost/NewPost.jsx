import React from 'react'
import TextEditor from '../../Components/TextEditor/TextEditor'
import { signOut } from "firebase/auth";
import { auth } from '../../Firebase/firebase-config';
import './NewPost.css'
import Button from '../../Components/Button/Button';

const NewPost = () => {
  return (
    <div>
      <TextEditor />
      <Button onClick={() => signOut(auth)} value={'Salir'} />
    </div>
  )
}

export default NewPost
