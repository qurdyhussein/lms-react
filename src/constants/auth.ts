// src/services/auth.ts

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await fetch("http://127.0.0.1:8000/lms/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.detail || "Login failed");
    }

    const data = await response.json();
    const token = data?.access || data?.token;

    if (!token) throw new Error("No token received");

    localStorage.setItem("access_token", token);
    return token;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getAuthHeader = () => {
  const token = localStorage.getItem("access_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};