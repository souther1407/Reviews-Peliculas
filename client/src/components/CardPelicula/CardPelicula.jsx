import React from 'react'
import styles from "./cardPelicula.module.css"

const CardPelicula = ({title,description,year,img,categories,director}) => {
  return (
    <div className={styles.cardPelicula}>
        <h1>{title}</h1>
        <img src={img}/>
        <p>{description}</p>
    </div>
  )
}

export default CardPelicula