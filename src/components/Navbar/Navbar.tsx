import { Link } from 'react-router-dom';

import Logo from '../../../src/assets/ice-delivery.webp';
import '../../index.css';
import './Navbar.css';

const NavBar = () => {
  return (
    <>
      <div className='flex flex-row items-center text-black bg-grey-200 h-24 w-full'>
        <img className='w-15 h-20 m-5 rounded-md' src={Logo} alt='Logo' />
        <ul className='flex flex-row'>
          <li>
            <Link className='p-5 transition ease-in duration-400 hover:text-primary' to='/'>
              Home
            </Link>
          </li>
          <li>
            <Link
              className='p-5 transition ease-in duration-400 hover:text-primary'
              to='/all-deliveries'
            >
              All Deliveries
            </Link>
          </li>
        </ul>
      </div>
      <hr className='text-black' />
    </>
  );
};

export default NavBar;
