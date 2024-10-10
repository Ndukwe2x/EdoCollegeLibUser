// AuthContext.js
import { useContext, useState, createContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authenticateUser, createUser, loginUser } from './authHandler';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Added to handle redirects

  // Function to handle login
  const login = async (userName, token) => {
    setLoading(true);
    try {
      const response = await loginUser(userName, token);
      console.log("Response: ", response);

      if (response) {
        localStorage.setItem('credentials', JSON.stringify({ token: response.data.token }));
        setAuthenticatedUser(response.data.user);
        setLoading(false);
        navigate('/dashboard'); // Redirect after login
        return response;
      }
    } catch (error) {
      console.error('Login failed:', error);
      setAuthenticatedUser(null);
      setLoading(false);
    }
  };
  // Function to handle signUp
  const signUp = async (userData) => {
    setLoading(true);
    try {
      console.log("Attempting sign up..", userData);
      const response = await createUser(userData);
      console.log("Response: ", response);

      if (response) {
        localStorage.setItem('credentials', JSON.stringify({ token: response.data.token }));
        setAuthenticatedUser(response.data.user);
        setLoading(false);
        navigate('/dashboard'); // Redirect after login
        return response;
      }
    } catch (error) {
      console.error('Signup failed:', error);
      setAuthenticatedUser(null);
      setLoading(false);
    }
  };

  // Function to check if the user is authenticated on initial load
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const authResponse = await authenticateUser('/login');
        setAuthenticatedUser(authResponse.user);
      } catch (error) {
        setAuthenticatedUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Define isAuthenticated based on whether authenticatedUser is set
  const isAuthenticated = !!authenticatedUser;

  return (
    <AuthContext.Provider value={{ authenticatedUser, setAuthenticatedUser, isAuthenticated, login, signUp, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
