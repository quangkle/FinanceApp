import { Link } from "react-router-dom";
import logo from "./logo.png";
import { useAuth } from "../../Context/useAuth";

type Props = {};

const NavBar = (props: Props) => {
  const { isLoggedIn, user, logoutUser } = useAuth();

  return (
    <nav className="relative container mx-auto p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-20">
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
          <div className="hidden font-bold lg:flex">
            <Link to="/search" className="text-black hover:text-darkBlue">
              Search
            </Link>
          </div>
        </div>

        {isLoggedIn() ? (
          <div className="hidden lg:flex items-center space-x-6 text-back">
            <div className="hover:text-darkBlue">Welcome, {user?.userName}</div>
            <a href="/" onClick={logoutUser} className="text-black hover:text-darkBlue">
              Logout
            </a>
          </div>
        ) : (
          <div className="hidden lg:flex items-center space-x-6 text-back">
            <a href="/login" className="text-black hover:text-darkBlue">
              Login
            </a>
            <a
              href="/register"
              className="px-8 py-3 font-bold rounded text-white bg-lightGreen hover:opacity-70"
            >
              Signup
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
