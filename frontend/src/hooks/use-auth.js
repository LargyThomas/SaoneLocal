import { useMemo } from "react";
import { clearAuthStorage, getAuthToken, getStoredUser } from "../api/api.js";

export function useAuth() {
  return useMemo(() => {
    const token = getAuthToken();
    const user = getStoredUser();

    return {
      isAuthenticated: Boolean(token),
      logout: clearAuthStorage,
      token,
      user,
    };
  }, []);
}
