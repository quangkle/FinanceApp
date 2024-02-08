import { Outlet } from "react-router";
import NavBar from "./Components/NavBar/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}

export default App;
