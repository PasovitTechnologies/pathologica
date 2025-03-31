import { useState } from 'react';
import axiosInstance from '../utils/axiosConfig'; // Adjust path as needed
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State to store error messages
  const navigate = useNavigate();

  // Convert username (email) to lowercase on change
  const handleUsernameChange = (e) => {
    const lowerCaseUsername = e.target.value.toLowerCase();
    setUsername(lowerCaseUsername);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous error
    setError('');

    // Basic client-side validation
    if (!username || !password) {
      setError('Пожалуйста, заполните все поля.');
      return;
    }

    // Validate email format (basic check)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(username)) {
      setError('Пожалуйста, введите действительный адрес электронной почты.');
      return;
    }

    // Validate password length (example: minimum 6 characters)
    if (password.length < 6) {
      setError('Пароль должен содержать не менее 6 символов.');
      return;
    }

    try {
      const response = await axiosInstance.post('/auth/login', {
        username,
        password,
      });

      // Successful login
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (err) {
      // Handle different types of errors
      if (!err.response) {
        // Network error (e.g., server is down, no internet)
        setError('Ошибка сети. Пожалуйста, проверьте ваше интернет-соединение и попробуйте снова.');
      } else if (err.response.status === 401) {
        // Unauthorized: Invalid credentials
        setError('Неверное имя пользователя или пароль.');
      } else if (err.response.status === 400) {
        // Bad Request: Validation error or malformed request
        setError(err.response.data?.error || 'Неверный запрос. Пожалуйста, проверьте введенные данные.');
      } else if (err.response.status === 429) {
        // Too Many Requests: Rate limiting
        setError('Слишком много попыток входа. Пожалуйста, попробуйте снова через несколько минут.');
      } else if (err.response.status === 500) {
        // Server error
        setError('Ошибка сервера. Пожалуйста, попробуйте снова позже.');
      } else {
        // Unexpected error
        setError(err.response.data?.error || 'Произошла непредвиденная ошибка при входе.');
      }
    }
  };

  return (
    <div className="login-page">
      <Navbar showLogout={false} />
      <div className="login-container">
        <div className="login-card">
          <h2 className="login-title">Вход для администратора</h2>
          {/* Display error message if it exists */}
          {error && (
            <p className="error-message" style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>
              {error}
            </p>
          )}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username" className="form-label">
                Электронная почта
              </label>
              <input
                type="email" // Changed to type="email" for better UX
                id="username"
                value={username}
                onChange={handleUsernameChange} // Use the new handler
                className="form-input"
                required
                placeholder="example@domain.com"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Пароль
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                required
                placeholder="Введите ваш пароль"
              />
            </div>
            <button type="submit" className="login-button">
              Войти
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;