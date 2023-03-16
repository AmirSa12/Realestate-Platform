import React from 'react'
import { useState } from 'react'
import {toast} from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { ReactComponent as ArroRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import { async } from '@firebase/util'

function SignIn() {
  const [showPass, setShowPass] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const {email, password} = formData

  const navigate = useNavigate()

  const onChange = (e) =>{
     setFormData( (prevState)=> ({
      ...prevState,
      [e.target.id]: e.target.value
     }) )
  }

  const onSubmit = async(e)=>{
    e.preventDefault()

    try {
      const auth = getAuth()

      const userCredential = await signInWithEmailAndPassword(auth, email, password)

      if (userCredential.user){
        navigate('/')
      }
    } catch (error) {
      toast.error('Invalid Credentials')
    }
  }

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">
            Welcome Back!
          </p>
        </header>

          <form onSubmit={onSubmit}>
            <input type="email" className="emailInput" placeholder='Email' id='email' value={email} onChange={onChange} />
            <div className="passwordInputDiv">
              <input type={showPass ? 'text' : 'password'} className='passwordInput' placeholder='Password' id='password' value={password} onChange={onChange} />
              <img src={visibilityIcon} alt="show password" className="showPassword" onClick={()=> setShowPass((prevState)=> !prevState) } />
            </div>
            <Link to='/forgot-password'className='forgotPasswordLink'> Forgot Password </Link>

            <div className="signInBar">
              <p className="signInText">
                Sign In
              </p>
              <button className="signInButton">
                <ArroRightIcon fill='#ffffff' width='34px' height='34px' />
              </button>
            </div>
          </form>

          {/* GOOGLE LOGIN */}

          <Link to='/sign-up' className='registerLink'> Don't have an account? </Link>
      </div>
    </>
  )
}

export default SignIn