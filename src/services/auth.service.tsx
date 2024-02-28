import axios, { AxiosResponse } from "axios";

const API_URL = "http://localhost:8080/api/auth/";

interface UserData {
  username: string;
  email: string;
  message: string;
}

interface LoginResponse {
  username: string;
  accessToken: string;
}

const register = (
  username: string,
  email: string,
  password: string,
  role: string
): Promise<AxiosResponse<UserData>> => {
  return axios.post<UserData>(API_URL + "signup", {
    username,
    email,
    password,
    role,
  });
};

// const login = (username: string, password: string): Promise<LoginResponse> => {
//   return axios
//     .post<LoginResponse>(API_URL + "signin", {
//       username,
//       password,
//     })
//     .then((response: AxiosResponse<LoginResponse>) => {
//       if (response.data.username) {
//         localStorage.setItem("user", JSON.stringify(response.data));
//       }
//       console.log(response.data);
//       return response.data;
//     });
// };

const login = (username: string, password: string): Promise<LoginResponse> => {
  return axios
    .post<LoginResponse>(API_URL + "signin", {
      username,
      password,
    })
    .then((response: AxiosResponse<LoginResponse>) => {
      if (response.data.username) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      if (response.data.accessToken) {
        localStorage.setItem("accessToken", response.data.accessToken);
      }
      return response.data;
    });
};

const logout = (): Promise<void> => {
  localStorage.removeItem("user");
  return axios.post(API_URL + "signout").then((response) => {
    return response.data;
  });
};

const getCurrentUser = (): UserData | null => {
  const userString = localStorage.getItem("user");
  if (userString) {
    return JSON.parse(userString) as UserData;
  }
  return null;
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
