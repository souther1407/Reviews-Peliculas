import React, { useEffect, useState } from 'react'

import styles from './categorias.module.css'

import {MdKeyboardArrowDown,MdKeyboardArrowUp} from "react-icons/md"

import {Link} from "react-router-dom"

import { useDispatch,useSelector } from 'react-redux'
import {getCategories,getMovies} from "../../redux/actions/actions"

const Categorias = ({className}) => {

  const [ocultado,setOcultado] = useState(true)

  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getCategories())
  },[])

  const cargando = useSelector(state => state.loadingCategories)
  const categorias = useSelector(state => state.categories)
  return (
    <div className={`${className} ${styles.categorias}`}>
      <span className={ styles.categoriasBtn } onClick={() => setOcultado(!ocultado)}>

        Categorias { ocultado ? <MdKeyboardArrowDown id={styles.icon}/> : <MdKeyboardArrowUp id={styles.icon}/> }</span>
      
      <div className={`${styles.listadoCategorias} ${ocultado ? styles.oculto : ""}`}>
        {/* <Link to="/categorias/Accion">Accion</Link>
        <Link to="/categorias/Accion">Apaa</Link>
        <Link to="/categorias/Accion">Comedia</Link>
        <Link to="/categorias/Accion">Apaa</Link> */}
        {
          cargando 
          ?
          null
          :
          categorias.map(c => <Link to={`/categorias/${c.name}`} onClick={()=>dispatch(getMovies(`?category=${c.name}`))}>{c.name}</Link>)
        }
      </div>
    </div>
  )
}

export default Categorias