  import React, {  ChangeEventHandler, useState } from 'react'
  import { Link } from 'react-router-dom'

  export const Auth = () => {
    const[username,setUsername]=useState("");
    const[password,setPassword]=useState("");
    const[email,setEmail]=useState('')

    const handleSubmit = async () => {
      try {
        const response = await fetch("http://localhost:3000/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password }),
        });

        const data = await response.json();
        if (response.ok) {
          alert("Signup successful!");
          // Optionally redirect
        } else {
          alert(`Error: ${data.message || "Signup failed"}`);
        }
      } catch (err) {
        alert("Network error");
        console.error(err);
      }
    };
    
    
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-3xl font-semibold ">Authentification</div>
        <div className="text-slate-500 ">
          Create a account?
          <Link to={"/signin"}> Login</Link>
        </div>
        <div className="flex flex-col">
          <Label
            onChange={(e) => setUsername(e.target.value)}
            label="Username"
            placeholder="Deepak"
            value={username}
          />
          <Label
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            placeholder="deepak@gmail.com"
            value={email}
          />
          <Label
            onChange={(e) => setPassword(e.target.value)}
            label="password"
            placeholder="D@$fa324*&"
            value={password}
          />
          <button
            type="button"
            onClick={handleSubmit}
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
          <input type={type || "text"} onChange={onChange} value={value} placeholder={placeholder} className='mb-2 border rounded-md border-slate-400' />
        </div>
      )
  }