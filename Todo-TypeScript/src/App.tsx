import { CreateTodo } from "./components/CreateTodo";
import { Todos } from "./components/Todos";

export const App = () => {
  return (
    <>
      <CreateTodo />
      <Todos/>
    </>
  );
};
