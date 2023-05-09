import { useMemo, useState, useEffect } from 'react';
import service from '../../services/service';
import '../../index.css';
import './Search.css';
import { Form, FormField } from '../../components/form';
import SubmitButton from '../../components/SubmitButton';
import DeleteButton from '../../components/DeleteButton';
import Dropdown from '../../components/Dropdown';
import 'react-dropdown/style.css';
import { coolerData, iceData, neighborhoodData } from '../../components/Constants/constants';

function AllDeliveries() {
  const [deliveryData, setDeliveryData] = useState<DeliveryData[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  interface DeliveryData {
    id: number;
    start_date: Date;
    end_date: Date;
    cooler_size: string;
    ice_type: string;
    delivery_address: string;
    customer_name: string;
    customer_phone: string;
    customer_email: string;
    neighborhood: number;
    neighborhood_name: string;
    special_instructions: string;
    cooler_num: number;
    bag_limes: number;
  }

  const getDeliveries = async () => {
    const response = await service.getAll();
    setDeliveryData(response.data);
  };

  useEffect(() => {
    getDeliveries();
  }, []);

  const ordered_array = useMemo(() => {
    return deliveryData.sort(
      (a: { start_date: Date }, b: { start_date: Date }) =>
        new Date(a.start_date).getTime() - new Date(b.start_date).getTime(),
    );
  }, [deliveryData]); // Sort array based on the start date of delivery

  // const todayString: string = new Date().toLocaleString('en-US', {
  //   timeZone: 'America/New_York',
  // });
  // const today = new Date(todayString); // Get value of today in EST time

  // const yesterdayString: string = new Date(Date.now() - 24 * 60 * 60 * 1000).toLocaleString(
  //   'en-US',
  //   {
  //     timeZone: 'America/New_York',
  //   },
  // );
  // const yesterday = new Date(yesterdayString);

  const filtered_array = ordered_array.filter((item) => {
    return (
      item.delivery_address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.customer_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.customer_phone.includes(searchTerm.toLowerCase()) ||
      item.special_instructions.includes(searchTerm.toLowerCase())
    );
  });

  const confirmDelete = (id: number) => {
    let isExecuted = confirm('Are you sure to delete this reservation?');
    if (isExecuted == true) {
      deleteReservation(id);
    }
  };

  const deleteReservation = async (id: number) => {
    const response = await service.delete(id);
    if ((response.status = 200)) {
      alert('Delivery successfully deleted.');
      getDeliveries();
    } else {
      alert('Something went wrong. Please try again.');
    }
  };

  const handleSubmit = async (userInfo: any) => {
    const response = await service.update(userInfo.id, userInfo);
    if ((response.status = 200)) {
      alert('Delivery successfully updated!');
      getDeliveries();
    } else {
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className='overflow-x-scroll'>
      <h1 className='text-black uppercase tracking-widest font-bold text-center text-xl pt-8'>
        All Deliveries
      </h1>

      {/* Search box */}
      <div className='group ml-12 mb-8'>
        <svg className='icon' aria-hidden='true' viewBox='0 0 24 24'>
          <g>
            <path d='M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z'></path>
          </g>
        </svg>
        <input
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder='Search'
          type='search'
          className='input'
        />
      </div>

      <div className='bg-white w-full w-max items-center p-5 pb-5'>
        <div className='flex flex-row text-black justify-evenly'>
          <div>Start Date</div>
          <div>End Date</div>
          <div>Cooler Size</div>
          <div># of Coolers</div>
          <div>Ice Type</div>
          <div>Delivery Address</div>
          <div>Customer Name</div>
          <div>Customer Phone</div>
          <div>Neighborhood</div>
          <div>Bag of Limes</div>
          <div>Customer Email</div>
          <div>Special Instructions</div>
          <div>Save</div>
          <div>Delete</div>
        </div>
        {filtered_array.map((item) => (
          <Form
            key={item.id}
            initialValues={{
              id: item.id,
              cooler_size: item.cooler_size,
              ice_type: item.ice_type,
              delivery_address: item.delivery_address,
              customer_name: item.customer_name,
              customer_phone: item.customer_phone,
              customer_email: item.customer_email,
              start_date: new Date(item.start_date).toISOString().slice(0, 10),
              end_date: new Date(item.end_date).toISOString().slice(0, 10),
              neighborhood: item.neighborhood,
              special_instructions: item.special_instructions,
              cooler_num: item.cooler_num,
              bag_limes: item.bag_limes,
            }}
            onSubmit={handleSubmit}
          >
            <div className='flex flex-row items-center space-evenly'>
              <FormField width='w-32' name='start_date' type='date' />
              <FormField width='w-32' name='end_date' type='date' />
              <Dropdown data={coolerData} name='cooler_size' />
              <FormField width='w-12' name='cooler_num' type='number' />
              <Dropdown data={iceData} name='ice_type' />
              <FormField width='w-32' name='delivery_address' type='text' />
              <FormField width='w-32' name='customer_name' type='text' />
              <FormField width='w-32' name='customer_phone' type='text' />
              <Dropdown data={neighborhoodData} name='neighborhood' />
              <FormField width='w-12' name='bag_limes' type='number' />
              <FormField width='w-32' name='customer_email' type='email' />
              <FormField width='w-32' name='special_instructions' type='text' />
              <SubmitButton title='Save' />
              <DeleteButton onPress={() => confirmDelete(item.id)} />
            </div>
          </Form>
        ))}
      </div>
    </div>
  );
}

export default AllDeliveries;
