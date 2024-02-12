import React from 'react'
import './Button.css'

const Button = ({ type, value, onClick }) => {
  return (
    <button type={type} className='button' onClick={onClick}>{value}</button>
  )
}

export default Button
