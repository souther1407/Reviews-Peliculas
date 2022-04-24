import React from 'react'
import styles from './button.module.css'

const Button = ({text,onClick,type}) => {
  return (
    <button className={`${styles.button} ${styles[type] ? styles[type] : "fulled" }`} onClick={onClick}>{text}</button>
  )
}

export default Button