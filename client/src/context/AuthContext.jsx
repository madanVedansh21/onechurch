import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const storedType = localStorage.getItem("userType"); // 'user' or 'church'
      if (!storedType) {
        setLoading(false);
        return;
      }

      try {
        const endpoint =
          storedType === "church" ? "/churches/profile" : "/users/me";
        const { data } = await api.get(endpoint);

        // Normalize response: user endpoint returns {user: ...}, church returns {church: ...}
        setUser(data.user || data.church);
      } catch (error) {
        console.error("Auth check failed", error);
        localStorage.removeItem("userType");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password, role) => {
    // role is 'user', 'church', etc.
    // If role is admin, we treat as user or separate?
    // User requested 'admin' in UI but backend only has church and user models?
    // user.controllers has 'role' field.
    // church.controllers is for 'church' entity.

    // For now assuming role 'church' goes to church endpoints, others to user.
    const isChurch = role === "church";
    const endpoint = isChurch ? "/churches/login" : "/users/login";

    const { data } = await api.post(endpoint, { email, password });

    setUser(data.user || data.church); // or data.church
    localStorage.setItem("userType", isChurch ? "church" : "user");
    return data;
  };

  const register = async (formData, role) => {
    const isChurch = role === "church";
    const payload = {
      fullName: formData.name, // Convert 'name' to 'fullName'
      email: formData.email,
      password: formData.password,
    };

    const endpoint = isChurch ? "/churches/register" : "/users/register";
    const { data } = await api.post(endpoint, payload);

    setUser(data.user || data.church);
    localStorage.setItem("userType", isChurch ? "church" : "user");
    return data;
  };

  const logout = async () => {
    console.log("Logging out...");
    const storedType = localStorage.getItem("userType");
    const endpoint =
      storedType === "church" ? "/churches/logout" : "/users/logout";

    // Clear local state immediately
    setUser(null);
    localStorage.removeItem("userType");

    try {
      await api.post(endpoint);
    } catch (e) {
      console.error("Logout error (background)", e);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
