import { useState } from "react";
import { CreateTodo } from "./components/CreateTodo";
import { Todos } from "./components/Todos";

export const App = () => {
  const [todos,setTodos]=useState([])
  fetch("http://localhost:3000/api/v1/todos")
    .then(async function(res){
      const json=await res.json();
      setTodos(json)
    })
  return (
    <>
      <CreateTodo />
      <Todos todos={todos}/>
    </>
  );
};
