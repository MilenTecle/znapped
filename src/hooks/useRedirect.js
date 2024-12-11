import axios from "axios";
import { useEffect } from "react";
import { useHistory } from "react-router";

/**
 * Redirects user based on their authentication status.
 * Ensures correct navigation when token expire or authentication changes.
 */
export const useRedirect = (userAuthStatus) => {
  const history = useHistory();

  useEffect(() => {
    const handleMount = async () => {
        // Check for the refresh token timestamp in localStorage
      const refreshTokenTimestamp = localStorage.getItem('refreshTokenTimestamp');

      /**
       * if no refresh token exists and userAuthStatus is "loggedOut",
        *redirect to sign-in page
        */
      if (!refreshTokenTimestamp) {
        if (userAuthStatus === 'loggedOut') {
          history.push('/signin')
        }
        return;
      }
      try {
        await axios.post('/dj-rest-auth/token/refresh/');
        // if user is logged in, the code below will run
        if (userAuthStatus === 'loggedIn') {
          history.push('/')
        }
      } catch (err) {
        // if user is logged out,the code below will run
        if (userAuthStatus === 'loggedOut') {
          history.push('/signin')
        }
      }
    };
    handleMount();
  }, [history, userAuthStatus]);
};