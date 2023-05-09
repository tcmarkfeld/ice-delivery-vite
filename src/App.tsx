import { Home } from './screens/Home';
import { TableTest } from './screens/Deliveries';
// import { AllDeliveries } from './screens/Deliveries';
import { NavBar } from './components/Navbar';
import { Route, Routes } from 'react-router-dom';

export const App = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path='/' Component={Home} />
        <Route path='/all-deliveries' Component={TableTest} />
      </Routes>
    </div>
  );
};
