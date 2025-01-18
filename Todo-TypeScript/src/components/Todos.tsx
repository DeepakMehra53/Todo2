interface Todos {
    id:number,
    title:string,
    description:string,
    completed:boolean
}
interface TodosProps{
    todos:Todos[];
}
export const Todos: React.FC<TodosProps> = ({ todos }) => {
  return (
    <div>
      {todos.map(function (todo) {
        return (
          <div>
            <h1>{todo.title}</h1>
            <h2>{todo.description}</h2>
            <button className="p-1 border border-black rounded-md">
              {todo.completed == true ? "Completed" : "Mark as Done"}
            </button>
          </div>
        );
      })}
    </div>
  );
};