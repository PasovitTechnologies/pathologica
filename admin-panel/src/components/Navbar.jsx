import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/Pathologica.png'; // Adjust the path based on your file name
import { FaSignOutAlt } from 'react-icons/fa'; // Exit icon

const Navbar = ({ showLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoClick = () => {
    if (location.pathname.startsWith('/form/')) {
      navigate('/dashboard');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <img
        src={logo}
        alt="PathoLogica Logo"
        className="navbar-logo"
        onClick={handleLogoClick}
        style={{ cursor: location.pathname.startsWith('/form/') ? 'pointer' : 'default' }}
      />
      {showLogout && (
        <button className="logout-button" onClick={handleLogout}>
          <FaSignOutAlt className="logout-icon" /> Выйти
        </button>
      )}
    </nav>
  );
};

export default Navbar;