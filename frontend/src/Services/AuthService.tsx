import axios from "axios";
import { handleApiError } from "../Helpers/ApiErrorHandler";
import { UserProfileToken } from "../Models/User";

const api = "http://localhost:5177/api/";

export const loginApi = async (username: string, password: string) => {
  try {
    const data = await axios.post<UserProfileToken>(api + "account/login", {
      username: username,
      password: password,
    });

    return data;
  } catch (error) {
    handleApiError(error);
  }
};

export const registerApi = async (email: string, username: string, password: string) => {
    try {
      const data = await axios.post<UserProfileToken>(api + "account/register", {
        email: email,
        username: username,
        password: password,
      });
  
      return data;
    } catch (error) {
      handleApiError(error);
    }
  };
