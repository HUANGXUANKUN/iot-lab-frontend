import { useState, useCallback, useEffect } from 'react';

let logoutTimer;

export const useAuth = () => {
  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(false);
  const [userName, setUserName] = useState(false);

  const login = useCallback((uid, userName, token, expirationDate) => {
    setToken(token);
    setUserId(uid);
    setUserName(userName);
    // Set expiration date to 3hr
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 3* 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    
    // save user data to localStorage
    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId: uid,
        userName, userName,
        token: token,
        expiration: tokenExpirationDate.toISOString()
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    setUserName(null);
    localStorage.removeItem('userData');
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(storedData.userId, storedData.userName, storedData.token, new Date(storedData.expiration));
    }
  }, [login]);

  return { token, login, logout, userId, userName };
};