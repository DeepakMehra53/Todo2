import React, { ChangeEvent, ChangeEventHandler } from 'react'
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
        <div>
          <Label  label="Username" placeholder='deepak@gmail.com'/>
        </div>
    </div>
  )
}


interface LableControl {
  type?:string;
  label:string;
  placeholder:string;
  onChange?:ChangeEventHandler<HTMLInputElement>
  value?:string;
  
}

function Label ({type,label,placeholder,onChange,value}:LableControl){
    return (
      <div>
        <label >{label}</label>
        <input type={type || "text"} onChange={onChange} value={value} placeholder={placeholder}/>
      </div>
    )
}