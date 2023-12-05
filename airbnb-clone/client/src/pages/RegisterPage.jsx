import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const RegisterPage = () => {
    const[name, setName] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    
    async function registerUser(ev){
        ev.preventDefault();
        try{
        await axios.post('/register', {
          name,
          email,
          password,
        });

        alert('registration successful.Now you can log in');
      } catch(e){
        alert('Registration Failed');
      }
    }

 
  return (
    <div className='mt-4 grow flex flex-col items center justify-around '>
     
      <form className=' mb-64 max-w-md mx-auto ' onSubmit={registerUser}>
      <h1 className='text-4xl text-center mb-4'>Register</h1>
        <input type='text' placeholder='your name' 
        value={name} 
        onChange={ev=>setName(ev.target.value )}/>
        <input type='email' placeholder= 'youremail.com' 
        value={email}
        onChange={ev=>setEmail(ev.target.value)}/>
        <input type = "password" placeholder='password'
        value={password}
        onChange={ev=> setPassword(ev.target.value)}/>
        <button className='primary'>Register</button>
        <div className='text-center py-2 text-gray-500'>
          Already a member?
           <Link className='underline text-black' to={'/login'}>Login</Link>
           </div>
      </form>
    </div>
  )
}

export default RegisterPage
