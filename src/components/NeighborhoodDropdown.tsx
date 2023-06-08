import { FormikValues, useFormikContext } from 'formik';

import Dropdown from 'react-dropdown';
import {
  buckIsland,
  corollaLight,
  crownPoint,
  cruzBay,
  currituckClub,
  hijo,
  klmpq,
  monterayShores,
  oceanHill,
  pineIsland,
  sectionA,
  sectionB,
  sectionC,
  sectionD,
  sectionE,
  sectionF,
  spinDrift,
  whalehead,
  whaleheadRight,
} from './Constants/constants';
import { useEffect } from 'react';
import { FormErrorMessage } from './form';

interface NeighborhoodDropdownProps {
  name: string;
  data: { label: string; value: string }[];
}

function NeighborhoodDropdown({ name, data, ...otherTextInputProps }: NeighborhoodDropdownProps) {
  const { setFieldValue, values, errors, touched } =
    useFormikContext<FormikValues>();

  useEffect(() => {
    const str = values.delivery_address.replace(/[^a-zA-Z]/g, '').toUpperCase();
    if (sectionA.includes(str)) {
      setFieldValue('neighborhood', '7');
    } else if (sectionB.includes(str)) {
      setFieldValue('neighborhood', '8');
    } else if (sectionC.includes(str)) {
      setFieldValue('neighborhood', '9');
    } else if (sectionD.includes(str)) {
      setFieldValue('neighborhood', '10');
    } else if (sectionE.includes(str)) {
      setFieldValue('neighborhood', '11');
    } else if (sectionF.includes(str)) {
      setFieldValue('neighborhood', '12');
    } else if (hijo.includes(str)) {
      setFieldValue('neighborhood', '13');
    } else if (klmpq.includes(str)) {
      setFieldValue('neighborhood', '14');
    } else if (crownPoint.includes(str)) {
      setFieldValue('neighborhood', '15');
    } else if (spinDrift.includes(str)) {
      setFieldValue('neighborhood', '6');
    } else if (pineIsland.includes(str)) {
      setFieldValue('neighborhood', '5');
    } else if (buckIsland.includes(str)) {
      setFieldValue('neighborhood', '16');
    } else if (oceanHill.includes(str)) {
      setFieldValue('neighborhood', '1');
    } else if (corollaLight.includes(str)) {
      setFieldValue('neighborhood', '2');
    } else if (cruzBay.includes(str)) {
      setFieldValue('neighborhood', '19');
    } else if (whalehead.includes(str)) {
      setFieldValue('neighborhood', '3');
    } else if (whaleheadRight.includes(str)) {
      setFieldValue('neighborhood', '18');
    } else if (monterayShores.includes(str)) {
      setFieldValue('neighborhood', '17');
    } else if (currituckClub.includes(str)) {
      setFieldValue('neighborhood', '4');
    }
  }, [values['delivery_address']]);

  return (
    <div className='mb-4'>
      <Dropdown
        className='border-2 border-primary bg-lightgrey hover:bg-lightgrey text-black text-md tracking-small w-80 rounded-lg default:[color-scheme:dark] pl-2 z-50 absolute'
        options={data}
        onChange={(event: any) => setFieldValue(name, event.value)}
        value={values[name]}
        {...otherTextInputProps}
      />
      {errors[name] && touched[name] ? null : <h6> </h6>}
      <FormErrorMessage error={errors[name]} visible={touched[name]} />
    </div>
  );
}

export default NeighborhoodDropdown;
