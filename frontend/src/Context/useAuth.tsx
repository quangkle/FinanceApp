import React, { createContext, useContext, useEffect, useState } from "react";
import { UserProfile } from "../Models/User";
import { useNavigate } from "react-router-dom";
import { loginApi, registerApi } from "../Services/AuthService";
import { toast } from "react-toastify";
import axios from "axios";

type UserContextType = {
  user: UserProfile | null;
  token: string | null;
  registerUser: (email: string, username: string, password: string) => void;
  loginUser: (username: string, password: string) => void;
  logoutUser: () => void;
  isLoggedIn: () => boolean;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (user && token) {
      setUser(JSON.parse(user));
      setToken(token);
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    }

    setIsReady(true);
  }, []);

  const registerUser = async (
    email: string,
    username: string,
    password: string
  ) => {
    await registerApi(email, username, password)
      .then((res) => {
        if (res) {
          localStorage.setItem("token", res?.data.token);

          const loggedInUser = {
            userName: res?.data.userName,
            email: res?.data.email,
          };
          localStorage.setItem("user", JSON.stringify(loggedInUser));

          setToken(res?.data.token);
          setUser(loggedInUser);

          toast.success("Login Success!");
          navigate("/search");
        }
      })
      .catch((e) => toast.warning("Server Error!"));
  };

  const loginUser = async (username: string, password: string) => {
    await loginApi(username, password)
      .then((res) => {
        if (res) {
          localStorage.setItem("token", res?.data.token);

          const loggedInUser = {
            userName: res?.data.userName,
            email: res?.data.email,
          };
          localStorage.setItem("user", JSON.stringify(loggedInUser));

          setToken(res?.data.token);
          setUser(loggedInUser);

          toast.success("Login Success!");
          navigate("/search");
        }
      })
      .catch((e) => toast.warning("Server Error!"));
  };

  const isLoggedIn = () => {
    return !!user;
  }

  const logoutUser = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    setUser(null);
    setToken(null);
    navigate("/");
  }

  return (
    <UserContext.Provider value={{ loginUser, user, token, logoutUser, registerUser, isLoggedIn }}>
        {isReady ? children : null}
    </UserContext.Provider>
  )
};


export const useAuth = () => useContext(UserContext);