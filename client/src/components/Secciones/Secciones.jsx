import React from 'react'
import styles from './secciones.module.css'
import { Link } from 'react-router-dom'
import Categorias from "../Categorias/Categorias"

const Secciones = () => {
  return (
    <div className={styles.secciones}>
        <Link to="/" className={styles.link}>Home</Link>
        <Categorias className={styles.categorias}/>
        <Link to="/nosotros" className={styles.link}>Sobre nosotros</Link>
        <Link to="/contacto" className={styles.link}>Contactanos</Link>
    </div>
  )
}

export default Secciones