import { Outlet } from "react-router";
import NavBar from "./Components/NavBar/NavBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "./Context/useAuth";

function App() {
  return (
    <UserProvider>
      <NavBar />
      <Outlet />
      <ToastContainer />
    </UserProvider>
  );
}

export default App;
