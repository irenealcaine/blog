import React from 'react'
import './TextInput.css'

const TextInput = ({ placeholder, value, onChange }) => {
  return (
    <input
      className='text-input'
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  )
}

export default TextInput
