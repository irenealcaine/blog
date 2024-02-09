import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
  return (
    <nav className='footer'>
      <ul>
        <li><a href="" rel="noopener noreferrer" target="_blank">/contact</a></li>
        <li><a href="" rel="noopener noreferrer" target="_blank">/github</a></li>
        <li><a href="" rel="noopener noreferrer" target="_blank">/linkedin</a></li>
        <li><a href="" rel="noopener noreferrer" target="_blank">/portfolio</a></li>
        <li><Link to={'/new-post'}>/new-post</Link></li>
      </ul>
    </nav>
  )
}

export default Footer
