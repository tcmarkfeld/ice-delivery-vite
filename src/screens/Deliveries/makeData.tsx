import service from '../../services/service';

export type DeliveryData = {
  id?: number;
  start_date: Date;
  end_date: Date;
  cooler_size: string;
  ice_type: string;
  delivery_address: string;
  customer_name: string;
  customer_phone: string;
  cooler_num: number;
  bag_limes: number;
  customer_email: string;
  neighborhood: number;
  neighborhood_name?: string;
  neighborhood_id?: number;
  special_instructions: string;
  subRows?: DeliveryData[];
  [key: string]: any;
};

var i = -1;
const newDelivery = (deliveries: any): DeliveryData => {
  i += 1;
  return {
    id: deliveries[i].id,
    start_date: new Date(deliveries[i].start_date),
    end_date: new Date(deliveries[i].end_date),
    customer_name: deliveries[i].customer_name,
    customer_phone: deliveries[i].customer_phone,
    delivery_address: deliveries[i].delivery_address,
    cooler_size: deliveries[i].cooler_size,
    cooler_num: deliveries[i].cooler_num,
    ice_type: deliveries[i].ice_type,
    bag_limes: deliveries[i].bag_limes,
    customer_email: deliveries[i].customer_email,
    special_instructions: deliveries[i].special_instructions,
    neighborhood: deliveries[i].neighborhood,
    neighborhood_name: deliveries[i].neighborhood_name,
    neighborhood_id: deliveries[i].neighborhood_id,
  };
};

export async function makeData() {
  const response = await service.getAll();
  const deliveries = response.data;

  const makeDataLevel = (): DeliveryData[] => {
    return deliveries.map((): DeliveryData => {
      return {
        ...newDelivery(deliveries),
      };
    });
  };

  return makeDataLevel();
}
