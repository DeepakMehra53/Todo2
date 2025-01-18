import { useState } from "react";

export const CreateTodo =()=>{
  const[title,setTitle ]=useState("")
  const[description,setDescription ]=useState("")
    return (
      <>
        <div className="flex justify-center mt-4">
          <div className="ml-2">
            <input
              type="text"
              placeholder="Title"
              className="border border-black rounded "
              onChange={function(e){
                setTitle(e.target.value)
              }}
            />
          </div>
          <div className="ml-2">
            <input
              type="text"
              placeholder="Description"
              className="border border-black rounded "
              onChange={function(e){
                
                setDescription(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="flex justify-center mt-2">
          <button className="p-1 border border-black rounded-md" onClick={()=>{
            fetch("http://localhost:3000/api/v1/create",{
              method:"POST",
              body:JSON.stringify({
                title:title,
                description:description
              }),
              headers:{
                "content-type":"application/json"
              }
            })
            .then(async function (res){
               await res.json()
              alert("Todo added")
            })
          }}>
            Add todo
          </button>
        </div>
      </>
    );
}