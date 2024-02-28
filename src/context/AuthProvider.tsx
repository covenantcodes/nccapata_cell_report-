import React, { createContext, useState } from "react";

// Define the type for your authentication data
interface AuthData {
  user: string;
  pwd: string;
  roles: string;
  accessToken: string;
  // Add other properties as needed (e.g., accessToken, roles, etc.)
}

// Define the type for your context value
interface AuthContextType {
  auth: AuthData;
  setAuth: React.Dispatch<React.SetStateAction<AuthData>>;
}

// Initialize context with empty values
const initialAuthContext: AuthContextType = {
  auth: { user: "", pwd: "", roles: "", accessToken: ""}, // Initialize with empty user, adjust as needed
  setAuth: () => {}, // Provide a default function for setAuth
};

const AuthContext = createContext<AuthContextType>(initialAuthContext);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<AuthData>({
    user: "",
    pwd: "",
    roles: "",
    accessToken: "",
  }); // Initialize with empty user, adjust as needed

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
