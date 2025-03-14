import { createContext, useContext, useState, useEffect } from "react";

// Create the AuthContext
const AuthContext = createContext();

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  // State to store the user
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("jwtToken");
    if (!token) return null;

    try {
      const decoded = JSON.parse(atob(token.split(".")[1])); // Decode the token's payload
      return { username: decoded.sub, role: decoded.role, userId: decoded.userId }; // Use the 'sub' field as the username
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  });

  // Login function
  const login = (token) => {
    if (!token) return;

    // Save the token in localStorage
    localStorage.setItem("jwtToken", token);

    try {
      const decoded = JSON.parse(atob(token.split(".")[1])); // Decode the token's payload
      setUser({
        username: decoded.sub,
        role: decoded.role,
        userId: decoded.userId, // Add userId as part of the state
      });
    } catch (error) {
      console.error("Error decoding token during login:", error);
      setUser(null); // If decoding fails, set the user state to null
    }
  };

  // Logout function
  const logout = () => {
    // Remove the token from localStorage
    localStorage.removeItem("jwtToken");
    setUser(null); // Clear the user state
  };

  // Automatically log out if the token expires
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (!token) return;

    try {
      const decoded = JSON.parse(atob(token.split(".")[1])); // Decode the token
      const expiry = decoded.exp * 1000; // Convert expiry to milliseconds
      const currentTime = Date.now();

      // If the token is expired, log the user out
      if (currentTime > expiry) {
        logout();
      } else {
        // Set a timeout to automatically log out when the token expires
        const timeout = setTimeout(logout, expiry - currentTime);
        return () => clearTimeout(timeout); // Clear timeout on component unmount
      }
    } catch (error) {
      console.error("Error decoding token for expiration:", error);
      logout(); // Log out if the token is invalid
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
