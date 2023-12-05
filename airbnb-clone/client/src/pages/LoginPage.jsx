import React, {useState} from 'react'
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios'

const LoginPage = () => {
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const[redirect, setRedirect] = useState('');
  const[test, setTest]= useState('');
  async function handleLoginSubmit(ev){
    ev.preventDefault();
    try{
    await axios.post('/login', {email, password},);
    alert('Login successful')
    setRedirect(true);
    }catch(e){
      alert('Login failed');
    }
 
  }
  if(redirect){
    return <Navigate to ={'/'}/>
  }
  
  return (
    <div className='mt-4 grow flex flex-col items center justify-around '>
     
      <form className=' mb-64 max-w-md mx-auto ' onSubmit={handleLoginSubmit}>
      <h1 className='text-4xl text-center mb-4'>Login</h1>
        <input type='email' placeholder= 'youremail.com/'
        value={email}
        onChange={ev=> setEmail(ev.target.value)}/>
        <input type = "password" placeholder='password'
        value={password}
        onChange={ev=> setPassword(ev.target.value)}/>
        <button className='primary'>Login</button>
        <div className='text-center py-2 text-gray-500'>
          Don't have an account yet?
           <Link className='underline text-black' to={'/register'}>Register Now</Link>
           </div>
      </form>
    </div>
  )
}

export default LoginPage
