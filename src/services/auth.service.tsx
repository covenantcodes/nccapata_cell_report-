import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

interface User {
  accessToken: string;
}
class AuthService {
  login(username: string, password: string) {
    return axios
      .post(API_URL + "signin", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username: string, email: string, password: string) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
    });
  }

  getCurrentUser(): User | null {
    const userString = localStorage.getItem("user");
    return userString ? JSON.parse(userString) : null;
  }
}

export default new AuthService();
