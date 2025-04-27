import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Set auth token
    const setAuthToken = (token) => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            localStorage.setItem('token', token);
        } else {
            delete axios.defaults.headers.common['Authorization'];
            localStorage.removeItem('token');
        }
    };

    // Register user
    const register = async (formData) => {
        try {
            const res = await axios.post('/api/auth/register', formData);
            setAuthToken(res.data.token);
            await loadUser();
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.msg || 'Registration failed');
            throw err;
        }
    };

    // Login user
    const login = async (formData) => {
        try {
            const res = await axios.post('/api/auth/login', formData);
            setAuthToken(res.data.token);
            await loadUser();
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.msg || 'Login failed');
            throw err;
        }
    };

    // Logout user
    const logout = () => {
        setAuthToken(null);
        setUser(null);
        navigate('/login');
    };

    // Load user
    const loadUser = async () => {
        try {
            setAuthToken(token);
            const res = await axios.get('/api/auth/me');
            setUser(res.data);
        } catch (err) {
            setError(err.response?.data?.msg || 'Error loading user');
            logout();
        } finally {
            setLoading(false);
        }
    };

    // Check if user is authenticated
    const isAuthenticated = () => {
        return user !== null;
    };

    // Check user role
    const hasRole = (role) => {
        return user?.role === role;
    };

    useEffect(() => {
        if (token) {
            loadUser();
        } else {
            setLoading(false);
        }
    }, [token]);

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                loading,
                error,
                register,
                login,
                logout,
                isAuthenticated,
                hasRole,
                setError
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);