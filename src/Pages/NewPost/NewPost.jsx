import React from 'react'
import TextEditor from '../../Components/TextEditor/TextEditor'
import { signOut } from "firebase/auth";
import { auth } from '../../Firebase/firebase-config';

const NewPost = () => {
  return (
    <div>
      <TextEditor />
      <button onClick={() => signOut(auth)}>Salir</button>
    </div>
  )
}

export default NewPost
