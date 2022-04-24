import React, { useState } from 'react'
import styles from './login.module.css'
import Input from "../-Generics/Input/Input"
import Button from '../-Generics/Button/Button'
import {AiFillEye,AiFillEyeInvisible} from "react-icons/ai"
import InputIcon from '../-Generics/Input/InputIcon'

const server = import.meta.env.VITE_SERVER

const Login = () => {
  const [showPassword,setShowPassword] = useState(false);

  const [form, setForm] = useState({})

  const [errors, setErrors] = useState({
    userVacio:"ingrese el usuario por favor",
    passVacia:"ingrese la contraseña por favor"
  })

  const iniciarSesion = async () => {
    const r = await fetch(`${server}/auth/login`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify(form)
    })
    const response = await r.json()
    console.log(response)
  }

  const handlerShowPassword = (e) => {
    setShowPassword(!showPassword)
  }

  const handlerErrors = (state) => {
    let e = {}
    
    if(state.name === "") e.userVacio = "ingrese el usuario por favor"
    if(state.password === "") e.passVacia = "ingrese la contraseña por favor"

    return e
  }

  const handlerInput = (valor,inputName) => {
    
    setErrors(handlerErrors({
      ...form,
      [inputName]:valor
    }))
    setForm({
      ...form,
      [inputName]:valor
    })

  }
  
  const noErrors = (errors) => {
    return Object.keys(errors).length === 0
  }

  const handlerSubmit = (e) => {
    e.preventDefault();
    noErrors(errors) ? iniciarSesion(): alert("verifique los campos")
  }
  return (
    <div className={styles.login}>
        <h1>Bienvenido Admin :)</h1>
        <form className={styles.form} onSubmit={handlerSubmit}>

          <div>
            <Input label="Usuario" type="text" className={styles.input} name="name" onGetInput={handlerInput} />
            {errors.userVacio ? <p>{errors.userVacio}</p> : null}
          </div>

          <div>
            <InputIcon 
              label="Contraseña"
              onClickIcon={handlerShowPassword} 
              type={showPassword ? "text" : "password" } 
              className={styles.input} icon={showPassword ? <AiFillEyeInvisible/> : <AiFillEye />}
              onGetInput={handlerInput}
              name="password"
            />
            {errors.passVacia ? <p>{errors.passVacia}</p> : null}
          </div>

            <div className="row space-around m-column">
              <Button text="Iniciar sesion" type="fulled"/>
              <Button text="Recuperar contraseña" type="bordered"/>
            </div>
        
        </form>
    </div>
  )
}

export default Login