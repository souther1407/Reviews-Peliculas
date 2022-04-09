import React, { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'

import CardPelicula from "../CardPelicula/CardPelicula"

import {getMovies} from "../../redux/actions/actions"

import styles from './peliculas.module.css'


const Peliculas = () => {

  const dispatch = useDispatch()  

  useEffect(()=>{
        dispatch(getMovies(""))
  },[])

  const pelis = useSelector(state=>({movies:state.movies,loadingMovies:state.loadingMovies}))
  
  
  return (
    <div className={styles.peliculas}>
        {
            !pelis.loadingMovies
            ?
               
               pelis.movies.map(p=><CardPelicula
                    key={p.id}
                    title={p.title}
                    description={p.description}
                    year={p.year} 
                    img={p.img}
                    categories={p.categories}
                    director={p.director}/>)
            :
            <h1>Cargando...</h1>  
            
        }
    </div>
  )
}

export default Peliculas