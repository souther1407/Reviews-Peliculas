import React from 'react'
import styles from './buscar.module.css'

const Buscar = () => {
  return (
    <div className={styles.buscar}>
        <input className={styles.buscarInput} placeholder='buscar...'/>
        <button className={styles.buscarBtn}>Buscar</button>
    </div>
  )
}

export default Buscar