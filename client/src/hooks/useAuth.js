import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authStatus, setAuthStatus] = useState(false);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

    setAuthStatus(true);
  }, [user]);

  return { isLoggedIn, authStatus };
};
