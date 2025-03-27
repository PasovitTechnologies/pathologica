import FormTable from './FormTable';
import Navbar from './Navbar';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Navbar showLogout={true} />
      <FormTable />
    </div>
  );
};

export default Dashboard;