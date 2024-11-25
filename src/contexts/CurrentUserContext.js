import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useHistory } from "react-router";
import { removeTokenTimestamp, setTokenTimestamp, shouldRefreshToken } from "../utils/utils";

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const history = useHistory();

  const handleMount = async () => {
    const refreshTokenTimestamp = localStorage.getItem('refreshTokenTimestamp');
    if (!refreshTokenTimestamp) {
      console.log("No refresh token found");
      return;
    }
    try {
      const { data } = await axiosRes.get("dj-rest-auth/user/");
      setCurrentUser(data);
      console.log("Current user data", data)
    } catch (err) {
      console.error("Error fetching current user:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    handleMount();
  }, []);

  useMemo(() => {
    axiosReq.interceptors.request.use(
      async (config) => {
        const refreshTokenTimestamp = localStorage.getItem('refreshTokenTimestamp');

        if (!refreshTokenTimestamp) {
          return config;
        }

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

    axiosRes.interceptors.response.use(
      (response) => response,
      async (err) => {
        if (err.response?.status === 401) {
          const refreshTokenTimestamp = localStorage.getItem('refreshTokenTimestamp');

          if (!refreshTokenTimestamp) {
            setCurrentUser(null);
            history.push("/signin");
            return Promise.reject(err);
          }

          try {
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