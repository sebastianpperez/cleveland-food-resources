import React, { createContext, useContext, useState, useEffect } from 'react';
import { Lock, User, Eye, EyeOff, LogIn, Shield } from 'lucide-react';

// Admin Context
const AdminContext = createContext();

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
};

// Mock admin users - In production, this would be handled by a secure backend
const adminUsers = {
  'gcfb_admin_001': { username: 'gcfb_admin', password: 'gcfb2024!', name: 'GCFB Main Admin', permissions: ['all'] },
  'gcfb_admin_002': { username: 'gcfb_east', password: 'east2024!', name: 'GCFB East Admin', permissions: ['update_hours'] },
  'wscc_admin_001': { username: 'wscc_admin', password: 'wscc2024!', name: 'West Side Catholic Center', permissions: ['update_hours'] },
  'sh_admin_001': { username: 'sh_admin', password: 'sh2024!', name: 'Second Harvest Admin', permissions: ['update_hours'] },
  'sa_admin_001': { username: 'sa_admin', password: 'sa2024!', name: 'Salvation Army Admin', permissions: ['update_hours'] },
  'super_admin': { username: 'super_admin', password: 'SuperAdmin2024!', name: 'System Administrator', permissions: ['all', 'manage_users'] }
};

// Admin Provider Component
export const AdminProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on component mount
    const savedUser = localStorage.getItem('admin_user');
    const savedExpiry = localStorage.getItem('admin_session_expiry');
    
    if (savedUser && savedExpiry) {
      const now = new Date().getTime();
      if (now < parseInt(savedExpiry)) {
        setCurrentUser(JSON.parse(savedUser));
        setIsAuthenticated(true);
      } else {
        // Session expired
        localStorage.removeItem('admin_user');
        localStorage.removeItem('admin_session_expiry');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (username, password) => {
    // Find user with matching credentials
    const adminId = Object.keys(adminUsers).find(id => {
      const user = adminUsers[id];
      return user.username === username && user.password === password;
    });

    if (adminId) {
      const user = { ...adminUsers[adminId], id: adminId };
      setCurrentUser(user);
      setIsAuthenticated(true);
      
      // Set session expiry (4 hours)
      const expiryTime = new Date().getTime() + (4 * 60 * 60 * 1000);
      localStorage.setItem('admin_user', JSON.stringify(user));
      localStorage.setItem('admin_session_expiry', expiryTime.toString());
      
      return { success: true };
    } else {
      return { success: false, error: 'Invalid username or password' };
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('admin_user');
    localStorage.removeItem('admin_session_expiry');
  };

  const hasPermission = (permission) => {
    if (!currentUser) return false;
    return currentUser.permissions.includes('all') || currentUser.permissions.includes(permission);
  };

  const value = {
    isAuthenticated,
    currentUser,
    isLoading,
    login,
    logout,
    hasPermission
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

// Login Component
const AdminLogin = ({ onSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAdmin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await login(username, password);
      if (result.success) {
        if (onSuccess) onSuccess();
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="bg-primary-600 p-3 rounded-full">
            <Shield className="h-8 w-8 text-white" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Admin Login
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Cleveland Food Resources - Admin Panel
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter your username"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <LogIn className="h-5 w-5 mr-2" />
                    Sign In
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <h3 className="text-sm font-medium text-blue-900 mb-2">Demo Credentials:</h3>
              <div className="text-xs text-blue-700 space-y-1">
                <p><strong>Super Admin:</strong> super_admin / SuperAdmin2024!</p>
                <p><strong>GCFB Admin:</strong> gcfb_admin / gcfb2024!</p>
                <p><strong>Pantry Manager:</strong> gcfb_east / east2024!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Admin Auth Guard Component
export const AdminAuthGuard = ({ children, fallback }) => {
  const { isAuthenticated, isLoading } = useAdmin();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return fallback || <AdminLogin />;
  }

  return children;
};

export default AdminLogin;