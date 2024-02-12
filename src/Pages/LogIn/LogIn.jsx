import React, { useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';
import './Login.css'

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/new-post')
    } catch (error) {
      setError("Lo siento, sólo yo puedo agregar nuevos posts :)");
    }
  };

  return (
    <div>
      <Link to={'/'}>../</Link>
      <form className='form' onSubmit={handleLogin}>

        <Input
          type={'email'}
          value={email}
          placeholder={"Correo electrónico"}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          type={'password'}
          value={password}
          placeholder={"Contraseña"}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button type={'submit'} value={'Iniciar sesión'} />

        {error && <p className='error'>{error}</p>}
      </form>
    </div>
  );
}

export default LogIn
