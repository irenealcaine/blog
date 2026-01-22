import React from 'react'
import './Button.css'

const Button = ({ type, value, onClick,className }) => {
  return (
    <button type={type} className={`button ${className}`} onClick={onClick}>{value}</button>
  )
}

export default Button
