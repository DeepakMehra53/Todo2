import { BrowserRouter,Route,Routes } from "react-router-dom";
import { Auth } from "./components/Auth";

export const App = () => {
 
  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth/>}/>
      </Routes>
     </BrowserRouter>
    </>
  );
};
