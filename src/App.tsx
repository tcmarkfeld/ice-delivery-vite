// import { Home } from './screens/Home';
import { TableTest } from './screens/Deliveries';
// import { AllDeliveries } from './screens/Deliveries';
import { NavBar } from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import React from 'react';
import './index.css';
import './screens/Home/Home.css';
import service from './services/service';

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

function Home() {
  return (
    <div className='flex flex-row justify-center items-center my-4'>
      <form
        className='card p-20 m-8'
        onSubmit={(e: React.SyntheticEvent) => {
          e.preventDefault();
          const target = e.target as typeof e.target & {
            cooler: { value: string };
            ice: { value: string };
            address: { value: string };
            neighborhood: { value: string };
            name: { value: string };
            phoneNumber: { value: string };
            email: { value: string };
            special: { value: string };
            startdate: { value: Date };
            enddate: { value: Date };
            cooler_num: { value: number };
            bag_limes: { value: number };
          };

          const cooler_size = target.cooler.value;
          const ice_type = target.ice.value;
          const delivery_address = target.address.value;
          const neighborhood = target.neighborhood.value;
          const customer_name = target.name.value;
          const customer_phone = target.phoneNumber.value;
          const customer_email = target.email.value;
          const special_instructions = target.special.value;
          const start_date = target.startdate.value;
          const end_date = target.enddate.value;
          const cooler_num = target.cooler_num.value;
          const bag_limes = target.bag_limes.value;

          const data = {
            cooler_size: cooler_size,
            ice_type: ice_type,
            delivery_address: delivery_address,
            neighborhood: neighborhood,
            customer_name: customer_name,
            customer_phone: customer_phone,
            customer_email: customer_email,
            special_instructions: special_instructions,
            start_date: start_date,
            end_date: end_date,
            cooler_num: cooler_num,
            bag_limes: bag_limes,
          };

          if (cooler_size === 'null' || ice_type === 'null' || neighborhood === 'null') {
            alert('Please fill out all fields');
          } else {
            const call = async () => {
              const response = await service.create(data);
              if ((response.status = 200)) {
                alert('Delivery successfully added!');
              } else {
                alert('Something went wrong. Please try again.');
              }
            };
            call();
          }
        }}
      >
        <a className='singup'>Add Delivery</a>

        <div className='flex flex-col md:flex-row'>
          <div className='inputBox1 mb-10'>
            <input type='text' name='name' required />
            <span className='user'>Customer Name</span>
          </div>

          <div className='inputBox1 md:mx-20'>
            <input type='tel' name='phoneNumber' maxLength={13} required />
            <span className='user'>Phone Number</span>
          </div>
        </div>

        <div className='flex flex-col md:flex-row'>
          <div className='inputBox1 mb-10'>
            <input type='text' name='address' required />
            <span className='user'>Delivery Address</span>
          </div>

          <label className='md:mx-20'>
            <div className='inputBox1'>
              {/* <p className='text-center text-black uppercase tracking-widest'>Neighborhood:</p> */}
              <select
                className='border-l-2 border-b-2 border-primary rounded-bl-lg bg-transparent p-3 text-black uppercase text-sm tracking-widest'
                name='neighborhood'
                required
              >
                <option value='null'>Select Neighborhood...</option>
                <option value='1'>Ocean Hill</option>
                <option value='2'>Corolla Light</option>
                <option value='3'>Whalehead</option>
                <option value='16'>Cruz Bay (Soundfront at Corolla Bay)</option>
                <option value='15'>Monteray Shores</option>
                <option value='14'>Buck Island</option>
                <option value='13'>Crown Point</option>
                <option value='12'>KLMPQ</option>
                <option value='11'>HIJO</option>
                <option value='10'>Section F</option>
                <option value='4'>Currituck Club</option>
                <option value='9'>Section D</option>
                <option value='8'>Section C</option>
                <option value='7'>Section B</option>
                <option value='6'>Section A</option>
                <option value='5'>Pine Island</option>
              </select>
            </div>
          </label>
        </div>

        <div className='flex flex-col md:flex-row'>
          <label className='mb-10'>
            <p className='text-center text-black uppercase tracking-widest'>Start Date</p>
            <div className='inputBox1'>
              <input type='date' name='startdate' required />
            </div>
          </label>

          <label className='md:mx-20'>
            <p className='text-center text-black uppercase tracking-widest'>End Date</p>
            <div className='inputBox1'>
              <input type='date' name='enddate' required />
            </div>
          </label>
        </div>

        <div className='flex flex-col md:flex-row'>
          <label className='mb-10'>
            {/* <p className='text-center text-black uppercase tracking-widest'>Cooler Size:</p> */}
            <select
              name='cooler'
              className='border-l-2 border-b-2 border-primary rounded-bl-lg bg-transparent p-3 text-black uppercase text-sm tracking-widest'
              required
            >
              <option value='null'>Select Cooler...</option>
              <option value='40 Quart'>40 QUART</option>
              <option value='62 Quart'>62 QUART</option>
            </select>
          </label>

          <label className='mb-5 md:mx-20'>
            {/* <p className='text-center text-black uppercase tracking-widest'>Ice Type:</p> */}
            <select
              name='ice'
              className='border-l-2 border-b-2 border-primary rounded-bl-lg bg-transparent p-3 text-black uppercase text-sm tracking-widest'
              required
            >
              <option value='null'>Select Ice...</option>
              <option value='Loose ice'>LOOSE ICE</option>
              <option value='Bagged ice'>BAGGED ICE</option>
            </select>
          </label>
        </div>

        <div className='flex flex-col md:flex-row'>
          <label className='mb-10'>
            <p className='text-center text-black uppercase tracking-widest'>Number of Coolers</p>
            <div className='inputBox1'>
              <input type='number' name='cooler_num' defaultValue={1} required />
            </div>
          </label>

          <label className='md:mx-20'>
            <p className='text-center text-black uppercase tracking-widest'>Bag of Limes</p>
            <div className='inputBox1'>
              <input type='number' name='bag_limes' defaultValue={0} required />
            </div>
          </label>
        </div>

        <div className='p-3 text-black uppercase text-sm tracking-widest'>Optional:</div>

        <div className='flex flex-col md:flex-row'>
          <div className='inputBox1 mb-10'>
            <input type='email' name='email' />
            <span>Customer Email</span>
          </div>

          <div className='inputBox md:mx-20'>
            <input type='text' name='special' />
            <span className='user'>Special Instructions</span>
          </div>
        </div>

        <button className='enter'>Submit</button>
      </form>
    </div>
  );
}