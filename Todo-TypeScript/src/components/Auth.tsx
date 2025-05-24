  import React, {  ChangeEventHandler, useState } from 'react'
  import { Link } from 'react-router-dom'

  export const Auth = () => {
    const[username,setUsername]=useState("");
    const[password,setPassword]=useState("");

    
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-3xl font-semibold ">Authentification</div>
        <div className="text-slate-500 ">
          Create a account?
          <Link to={"/signin"}> Login</Link>
        </div>
        <div className="flex flex-col">
          <Label
            onChange={(e)=>setUsername(e.target.value)}
            label="Username"
            placeholder="deepak@gmail.com"
          />
          <Label
            onChange={(e) => setPassword(e.target.value)}
            label="password"
            placeholder="D@$fa324*&"
          />
          <button
            type="button"
            className="mt-2 border border-black rounded-lg bg-slate-400 hover:bg-green-300"
          >
            Submit
          </button>
        </div>
      </div>
    );
  }


  interface LableControl {
    type?:string;
    label:string;
    placeholder:string;
    onChange:ChangeEventHandler<HTMLInputElement>
    value?:string;
    
  }

  function Label ({type,label,placeholder,onChange,value}:LableControl){
      return (
        <div className='flex flex-col'>
          <label >{label}</label>
          <input type={type || "text"} onChange={onChange} value={value} placeholder={placeholder} className='border rounded-md border-slate-400' />
        </div>
      )
  }