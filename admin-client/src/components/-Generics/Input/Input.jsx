import React, { useEffect, useState } from 'react'
import styles from './input.module.css'

const Input = ({label,type,className,onGetInput, name}) => {
  const [input,setInput]= useState("")

  useEffect(()=>{
    onGetInput(input,name)
  },[input])

  return (
    <div className={`${styles.input} ${className}`}>
        <label htmlFor='input'>{label}</label>
        <input  id="input" type={type} onChange={(e) => setInput(e.target.value)}/> 
    </div>
  )
}

export default Input