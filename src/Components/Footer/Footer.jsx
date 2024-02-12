import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
  return (
    <nav className='footer'>
      <ul>
        <li><a href="mailto:irenealcainealvarez@gmail.com?Subject=Charlemos!" rel="noopener noreferrer" target="_blank">/contact</a></li>
        <li><a href="https://github.com/irenealcaine" rel="noopener noreferrer" target="_blank">/github</a></li>
        <li><a href="https://www.linkedin.com/in/irenealcaine/" rel="noopener noreferrer" target="_blank">/linkedin</a></li>
        <li><a href="https://irenealcainealvarez.es" rel="noopener noreferrer" target="_blank">/portfolio</a></li>
        <li><Link to={'/new-post'}>/new-post</Link></li>
      </ul>
    </nav>
  )
}

export default Footer
