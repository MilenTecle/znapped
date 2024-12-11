import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useHistory } from "react-router";
import { removeTokenTimestamp, setTokenTimestamp, shouldRefreshToken } from "../utils/utils";

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

/**
 * CurrentUserProvider provides the current user context and handles token
 * management for user authentication.
 * It manages the user login state, refreshes tokens when needed, and logs the
 * user out on token expiration.
 */
export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const history = useHistory();

  /**
   * Checks if the refresh token exists in localStorage.
   * If present, fetches the current user's data from the API.
   */
  const handleMount = async () => {
    const refreshTokenTimestamp = localStorage.getItem('refreshTokenTimestamp');
    if (!refreshTokenTimestamp) {
      return;
    }
    try {
      const { data } = await axiosRes.get("dj-rest-auth/user/");
      setCurrentUser(data);
    } catch (err) {
    }
  };

  useEffect(() => {
    handleMount();
  }, []);

  /**
   * Intercepts outgoing requests to check token validity and refresh the
   * access token if needed.
   */
  useMemo(() => {
    axiosReq.interceptors.request.use(
      async (config) => {
        const refreshTokenTimestamp = localStorage.getItem('refreshTokenTimestamp');
        // Exit if no token timestamp exists
        if (!refreshTokenTimestamp) {
          return config;
        }
        // Refresh token if needed
        if (shouldRefreshToken()) {
          try {
            const { data } = await axios.post("/dj-rest-auth/token/refresh/");
            setTokenTimestamp(data);
            config.headers.Authorization = `Bearer ${data.access}`;
          } catch (err) {
            setCurrentUser(null)
            removeTokenTimestamp();
            history.push("/signin");
            throw err;
          }
        }
        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    /**
     * Handles unauthorized responses(401). Refreshes
     * token or logs out the user.
     */
    axiosRes.interceptors.response.use(
      (response) => response,
      async (err) => {
        if (err.response?.status === 401) {
          const refreshTokenTimestamp = localStorage.getItem('refreshTokenTimestamp');
          // Log out user if no refresh token exists
          if (!refreshTokenTimestamp) {
            setCurrentUser(null);
            history.push("/signin");
            return Promise.reject(err);
          }

          try {
            // Refresh the token
            const { data } = await axios.post("/dj-rest-auth/token/refresh/");
            setTokenTimestamp(data);
            err.config.headers.Authorization = `Bearer ${data.access}`;
            return axios(err.config);
          } catch (err) {
            setCurrentUser(null)
            removeTokenTimestamp();
            history.push("/signin");
            throw err;
          }
        }
        return Promise.reject(err);
      }
    );
  }, [history]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};