import React from 'react'
import { Link } from 'react-router-dom'

export const Auth = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
        <div className='text-3xl font-semibold '>
            Authentification 
        </div>
        <div className='text-slate-500 '>Create a account? 
            <Link to={"/signin"}> Login</Link>
        </div>
    </div>
  )
}


interface LableControl {
  type:string,
  
}

function Label ({type,lable,placeholder,onChange}){
    
}