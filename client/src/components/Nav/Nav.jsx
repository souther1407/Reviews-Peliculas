import React from 'react'
import Buscar from '../Buscar/Buscar'
import styles from "./nav.module.css"
import Secciones from '../Secciones/Secciones'

const Nav = () => {
  return (
    <nav className={styles.nav}>
        <Buscar />
        <Secciones />
    </nav>
  )
}

export default Nav