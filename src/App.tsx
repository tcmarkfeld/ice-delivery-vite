import { TableTest } from './screens/Deliveries';
// import { AllDeliveries } from './screens/Deliveries';
import { NavBar } from './components/Navbar';
import { Route, Routes } from 'react-router-dom';

import * as AuthService from './services/auth.service';
import IUser from './types/user.type';
import EventBus from './common/EventBus';
import { Form, FormField } from './components/form';

import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import './index.css';
import './screens/Home/Home.css';
import service from './services/service';
import { Login } from './screens/Login';
import NeighborhoodDropdown from './components/NeighborhoodDropdown';
import { coolerData, iceData, neighborhoodData } from './components/Constants/constants';
import SubmitButton from './components/SubmitButton';
import DropdownComponent from './components/Dropdown';

export const App = () => {
  const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
    EventBus.on('logout', logOut);
    return () => {
      EventBus.remove('logout', logOut);
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
  };

  return (
    <div>
      {currentUser ? (
        <>
          <NavBar />
          <Routes>
            <Route path='/' Component={Home} />
            <Route path='/all-deliveries' Component={TableTest} />
          </Routes>
        </>
      ) : (
        <Login />
      )}
    </div>
  );
};

function Home() {
  // These are regex expressions for form validation
  const nameRegExp = /^(?!.{126,})([\w+]{3,}\s+[\w+]{3,} ?)$/;

  const phoneRegExp = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4}$/im;

  const validationSchema = Yup.object().shape({
    start_date: Yup.date().required().label('Start Date'),
    end_date: Yup.date().required().label('End Date'),
    delivery_address: Yup.string().required().max(149).label('Delivery Address'),
    customer_name: Yup.string()
      .matches(nameRegExp, 'Enter first and last name (3 character min. each)')
      .required()
      .max(75)
      .label('Name'),
    customer_phone: Yup.string()
      .matches(phoneRegExp, 'Phone number is not valid')
      .required()
      .label('Phone Number'),
    customer_email: Yup.string().email().max(75).label('Email'),
    special_instructions: Yup.string().max(150).label('Special Instructions'),
    cooler_size: Yup.string().required().label('Cooler'),
    cooler_num: Yup.number().min(1).max(10).required().label('Cooler Number'),
    ice_type: Yup.string().required().label('Ice Type'),
    neighborhood: Yup.object().required().label('Neighborhood'),
    bag_limes: Yup.number().min(0).max(5).required().label('Limes'),
  });

  const handleSubmit = async (userInfo: any, { resetForm }: any) => {
    console.log(userInfo);

    if (
      userInfo.cooler_size === 'null' ||
      userInfo.ice_type === 'null' ||
      userInfo.neighborhood === 'null'
    ) {
      alert('Please fill out all fields');
    } else {
      const call = async () => {
        const response = await service.create(userInfo);
        if ((response.status = 200)) {
          alert('Delivery successfully added!');
        } else {
          alert('Something went wrong. Please try again.');
        }
      };
      call();
      resetForm();
    }
  };

  return (
    <div className='flex w-full bg-lightgrey justify-center items-center'>
      <div className='bg-white w-fit my-10 p-8 rounded-lg'>
        <Form
          initialValues={{
            cooler_size: '',
            ice_type: '',
            delivery_address: '',
            customer_name: '',
            customer_phone: '',
            customer_email: '',
            start_date: '',
            end_date: '',
            neighborhood: '',
            special_instructions: '',
            cooler_num: '1',
            bag_limes: '0',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <div className='flex flex-col items-center justify-center text-black'>
            <div className='flex flex-col lg:flex-row'>
              <div className='p-2 m-5'>
                <FormField label='Start Date' width='w-36' name='start_date' type='date' />
              </div>
              <div className='p-2 m-5'>
                <FormField label={'End Date'} width='w-36' name='end_date' type='date' />
              </div>
            </div>

            <div className='flex flex-col lg:flex-row'>
              <div className='p-2 m-5'>
                Cooler Size
                <DropdownComponent data={coolerData} name='cooler_size' />
              </div>
              <div className='p-2 m-5'>
                <FormField label='Number of Coolers' width='w-80' name='cooler_num' type='number' />
              </div>
            </div>

            <div className='flex flex-col lg:flex-row'>
              <div className='p-2 m-5'>
                Ice Type
                <DropdownComponent data={iceData} name='ice_type' />
              </div>
              <div className='p-2 m-5'>
                <FormField
                  label='Delivery Address'
                  width='w-80'
                  name='delivery_address'
                  type='text'
                />
              </div>
            </div>

            <div className='flex flex-col lg:flex-row'>
              <div className='p-2 m-5'>
                <FormField label='Customer Name' width='w-80' name='customer_name' type='text' />
              </div>
              <div className='p-2 m-5'>
                <FormField label='Customer Phone' width='w-80' name='customer_phone' type='text' />
              </div>
            </div>

            <div className='flex flex-col lg:flex-row'>
              <div className='p-2 m-5'>
                Neighborhood
                <NeighborhoodDropdown data={neighborhoodData} name='neighborhood' />
              </div>
              <div className='p-2 m-5'>
                <FormField label='Bag of Limes' width='w-80' name='bag_limes' type='number' />
              </div>
            </div>

            <div className='flex flex-col lg:flex-row'>
              <div className='p-2 m-5'>
                <FormField
                  label='Customer Email - optional'
                  width='w-80'
                  name='customer_email'
                  type='email'
                />
              </div>
              <div className='p-2 m-5'>
                <FormField
                  label='Special Instructions - optional'
                  width='w-80'
                  name='special_instructions'
                  type='text'
                />
              </div>
            </div>
            <SubmitButton title='Save' />
          </div>
        </Form>
      </div>
    </div>
  );
}
