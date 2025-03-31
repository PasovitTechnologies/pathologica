import { useState } from 'react';
import axiosInstance from '../utils/axiosConfig'; // Adjust path as needed
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Navbar from './Navbar';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/auth/login', {
        username,
        password,
      });
      localStorage.setItem('token', response.data.token);
      toast.success('Вход выполнен успешно!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Ошибка при входе.');
    }
  };

  return (
    <div className="login-page">
      <Navbar showLogout={false} />
      <div className="login-container">
        <div className="login-card">
          <h2 className="login-title">Вход для администратора</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username" className="form-label">
                Имя пользователя
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-input"
                required
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
