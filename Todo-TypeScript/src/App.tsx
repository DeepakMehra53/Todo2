
import { useState } from "react";

export const App =()=>{
  
  const [title,setTitle]=useState('');
  const [description,setDescription]=useState('');

  function handleTitle(){
    setTitle(title.target.value)
  }
  return (
    <>
      <div className="flex justify-center mt-4">
        <div className="ml-2">
          <input
            type="text"
            placeholder="Title"
            className="border border-black rounded "
            onChange={handleTitle}
          />
        </div>
        <div className="ml-2">
          <input
            type="text"
            placeholder="Description"
            className="border border-black rounded "
          />
        </div>
      </div>
      <div className="flex justify-center mt-2">
        
      <button className="p-1 border border-black rounded-md">Add todo</button>
      </div>
    </>
  );
}