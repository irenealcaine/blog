import React from 'react'
import TextEditor from '../../Components/TextEditor/TextEditor'
import { signOut } from "firebase/auth";
import { auth } from '../../Firebase/firebase-config';
import './EditPost.css'
import Button from '../../Components/Button/Button';

const EditPost = () => {
  return (
    <div>
      <TextEditor editMode={true} />
      <Button onClick={() => signOut(auth)} value={'Salir'} />
    </div>
  )
}

export default EditPost
