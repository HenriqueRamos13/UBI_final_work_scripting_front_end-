import { createContext, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../../utils/API_URL";
import defaultHeaders from "../../utils/defaultHeaders";
import { Role, RoleRoute } from "../../utils/RoleAndRoute";

interface SignInCredentials {
  email: string;
  password: string;
}

interface User {
  email: string;
  role: Role;
}

interface AuthContextData {
  signIn: (credentials: SignInCredentials) => Promise<any>;
  signOut: () => void;
  user: User | null;
  isAuthenticated: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  async function signIn({ email, password }: SignInCredentials) {
    const response = await fetch(API_URL + "/session", {
      method: "POST",
      ...defaultHeaders,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.message) {
      return alert(data.message);
    }

    if (data.token) {
      setUser(data.user);
      setIsAuthenticated(true);
    }
  }

  async function signOut(pathname = "/login") {
    await fetch(API_URL + "/session", {
      ...defaultHeaders,
      method: "DELETE",
    });

    setIsAuthenticated(false);
    setUser(null);
    navigate(pathname);
  }

  async function verifyIfUserIsAuthenticated() {
    const response = await fetch(API_URL + "/session", {
      ...defaultHeaders,
      method: "GET",
    });

    const data = await response.json();

    if (!data.isAuth) {
      return await signOut();
    }

    setIsAuthenticated(true);
    setUser(data.user);
  }

  useEffect(() => {
    if (user) {
      navigate(RoleRoute(user.role));
    }
  }, [user]);

  useEffect(() => {
    verifyIfUserIsAuthenticated();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
