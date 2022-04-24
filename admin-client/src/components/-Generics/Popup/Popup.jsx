import React from 'react'
import styles from './popup.module.css'

const Popup = ({msg,title,type}) => {
  return (
    <div className={`${styles.popup} ${type}`}>
        <h2>{title}</h2>
        <p>{msg}</p>
    </div>
  )
}

export default Popup