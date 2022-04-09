import React from 'react'
import styles from "./cardPelicula.module.css"

const CardPelicula = ({title,description,year,img,categories,director}) => {
  return (
    <div className={styles.cardPelicula}>
        <img src={img} className={styles.img}/>
        <div className={styles.cardPeliculaInfo}>
          <div className={styles.descPrincipal}>
            <h1>{title}</h1>
            <span>{year}</span>
            <span>De {director.name} {director.lastName}</span>
          </div>
          <p>{description}</p>

          <div className={styles.cardCategorias}>
            {categories.map(c=>{
              return <span>{c.name}</span>
            })} 
          </div>
        </div>
    </div>
  )
}

export default CardPelicula