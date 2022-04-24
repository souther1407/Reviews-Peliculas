import React, { useEffect,useState } from 'react'
import styles from './input.module.css'

const InputIcon = ({label,type,className,icon,onClickIcon, onGetInput, name}) => {
  const [input,setInput] = useState("")

  useEffect(()=>{
    onGetInput(input,name)
  },[input])

  return (
    <div className={`${styles.input} ${className}`}>
        <label htmlFor='input'>{label}</label>
        <div className={styles.inputWithIcon}>
          <input name={name} id="input" type={type} onChange={(e) => setInput(e.target.value)}/>
          <i onClick={(e)=>onClickIcon(e)} className={styles.icon}>{icon}</i>
        </div>
    </div>
  )
}

export default InputIcon