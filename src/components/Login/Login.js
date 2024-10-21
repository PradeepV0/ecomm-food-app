import React, { useState } from 'react'
import './Login.css'
import { assets } from '../../assets/assets'
import { login, signUp } from '../../APi/Api\'s'
import { errorToaster, successToaster } from '../../Toaster/ALertToaster'


const getInitialState = () =>{
  const initialState = {
    name : '',
    email : '',
    password : ''
  }
  return initialState
}

const Login = ({ setShowLogin }) => {
const [state,setState] = useState(getInitialState())
  const [currentState, setCurrentState] = useState("Login")


  const submit = (e) =>{
    e.preventDefault()
    const {name,email,password} = state
    const reqObj = {
      name,
      email,
      password
    }
    if(currentState === "Sign Up"){
    const response = signUp(JSON.stringify(reqObj))
    response.then(
    (data)=>{
      if(data.message ==="Successfully Signed Up"){
        console.log('Successfull Sign UP');
        successToaster('Successfull Sign UP')
        setShowLogin(false)
      }
    }
    )
  }else{
      delete reqObj.name
    const response = login(JSON.stringify(reqObj))
    response.then(
      (data)=>{
        if(data === undefined){
          errorToaster('User Name Or Password Wrong')
          return
        }
        successToaster('Successfull Sign IN')
        setShowLogin(false)

      },
    (err)=>{
      
    })
  }
  }


  const updateFieldState = (fieldName,fieldValue) => {
    setState((prev)=>({...prev,[fieldName] : fieldValue}))
  }

  return (
    <div className='login-popup'>
      <form className='login-popup-container'>
        <div className='login-popup-title'>
          <h2>{currentState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close icon" />        </div>
        <div className='login-popup-inputs'>
          {currentState === "Login" ? <></> :
            <input type='text' value={state.name} placeholder='Your Name' onChange={(e)=>updateFieldState( 'name',e.target.value)} required />}
          <input type='email' value={state.email} placeholder='Your email' onChange={(e)=>updateFieldState( 'email',e.target.value)} required />
          <input type='password' value={state.password} placeholder='password' onChange={(e)=>updateFieldState( 'password',e.target.value)} required />

        </div>
        <button onClick={(e)=>submit(e)}>{currentState === "Sign Up" ? "Create account" : "Login"}</button>
        <div className='login-popup-condition'>
          <input type='checkbox' required />
          <p>By continuing, i agree to the terms of use & privacy policy</p>
        </div>
        {currentState === "Login"
          ? <p>Create a new account? <span onClick={() => setCurrentState("Sign Up")}>Click here</span></p>
          : <p>Already have an account? <span onClick={() => setCurrentState("Login")}>Login here</span></p>
        }


      </form>
    </div>
  )
}

export default Login