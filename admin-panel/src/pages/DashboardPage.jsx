import Navbar from '../components/Navbar';
import Dashboard from '../components/Dashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DashboardPage = () => {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <Dashboard />
    </>
  );
};

export default DashboardPage;