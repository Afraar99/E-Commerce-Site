import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkUserLoggedIn = async () => {
      if (token) {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_API_URL}/profile`,
            {
              headers: { token },
            }
          );

          const data = await response.json();

          if (data.success) {
            setUser(data.user);
            setIsAuthenticated(true);
          } else {
            // If token is invalid, clear it
            localStorage.removeItem("token");
            setToken(null);
          }
        } catch (error) {
          console.error("Authentication error:", error);
          localStorage.removeItem("token");
          setToken(null);
        }
      }
      setLoading(false);
    };

    checkUserLoggedIn();
  }, [token]);

  // Login user
  const login = async (email, password) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        setUser(data.user);
        setIsAuthenticated(true);
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      return { success: false, message: "An error occurred during login" };
    }
  };

  // Register user
  const register = async (userData) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        }
      );

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        setUser(data.user);
        setIsAuthenticated(true);
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      return {
        success: false,
        message: "An error occurred during registration",
      };
    }
  };

  // Update profile
  const updateProfile = async (userData) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/profile/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
          body: JSON.stringify(userData),
        }
      );

      const data = await response.json();

      if (data.success) {
        setUser(data.user);
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      return {
        success: false,
        message: "An error occurred while updating profile",
      };
    }
  };

  // Logout
  const logout = async () => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/logout`, {
        headers: { token },
      });

      localStorage.removeItem("token");
      setToken(null);
      setUser(null);
      setIsAuthenticated(false);
      return { success: true };
    } catch (error) {
      return { success: false, message: "An error occurred during logout" };
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login,
        register,
        updateProfile,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
