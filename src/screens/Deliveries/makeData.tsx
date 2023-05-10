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
const newDelivery = (ordered_array: any): DeliveryData => {
  i += 1;
  return {
    id: ordered_array[i].id,
    start_date: new Date(ordered_array[i].start_date),
    end_date: new Date(ordered_array[i].end_date),
    customer_name: ordered_array[i].customer_name,
    customer_phone: ordered_array[i].customer_phone,
    delivery_address: ordered_array[i].delivery_address,
    cooler_size: ordered_array[i].cooler_size,
    cooler_num: ordered_array[i].cooler_num,
    ice_type: ordered_array[i].ice_type,
    bag_limes: ordered_array[i].bag_limes,
    customer_email: ordered_array[i].customer_email,
    special_instructions: ordered_array[i].special_instructions,
    neighborhood: ordered_array[i].neighborhood,
    neighborhood_name: ordered_array[i].neighborhood_name,
    neighborhood_id: ordered_array[i].neighborhood_id,
  };
};

export async function makeData() {
  const response = await service.getAll();
  const deliveries = response.data;

  const ordered_array = deliveries.sort(
    (a: { start_date: Date }, b: { start_date: Date }) =>
      new Date(a.start_date).getTime() - new Date(b.start_date).getTime(),
  );

  const makeDataLevel = (): DeliveryData[] => {
    return ordered_array.map((): DeliveryData => {
      return {
        ...newDelivery(ordered_array),
      };
    });
  };

  return makeDataLevel();
}
