import Login from '../components/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import doctorLabImage from '../assets/wp7549076.jpg'; // Import the image here

const LoginPage = () => {
  return (
    <div className="login-page" style={{ backgroundImage: `url(${doctorLabImage})` }}>
      <ToastContainer />
      <Login />
    </div>
  );
};

export default LoginPage;