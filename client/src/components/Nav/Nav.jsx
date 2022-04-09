import React from 'react'
import Buscar from '../Buscar/Buscar'
import styles from "./nav.module.css"

const Nav = () => {
  return (
    <nav className={styles.nav}>
        <Buscar />
    </nav>
  )
}

export default Nav