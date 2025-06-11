import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Main } from "./pages/Main";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Main/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/signin" element={<Signin/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
