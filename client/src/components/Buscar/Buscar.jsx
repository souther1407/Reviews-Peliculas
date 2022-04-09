import React from 'react'
import styles from './buscar.module.css'
import {MdSearch} from "react-icons/md"
const Buscar = () => {
  return (
    <div className={styles.buscar}>
        <input className={styles.buscarInput} placeholder='buscar...'/>
        <button className={styles.buscarBtn}><MdSearch className={styles.icon}/></button>
    </div>
  )
}

export default Buscar