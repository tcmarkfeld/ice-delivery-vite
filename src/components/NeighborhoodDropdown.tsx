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
  const { setFieldValue, values, errors, touched } = useFormikContext<FormikValues>();

  useEffect(() => {
    const str = values.delivery_address.replace(/[^a-zA-Z]/g, '').toUpperCase();
    if (sectionA.includes(str)) {
      setFieldValue('neighborhood', { label: 'Section A', value: '7' });
    } else if (sectionB.includes(str)) {
      setFieldValue('neighborhood', { label: 'Section B', value: '8' });
    } else if (sectionC.includes(str)) {
      setFieldValue('neighborhood', { label: 'Section C', value: '9' });
    } else if (sectionD.includes(str)) {
      setFieldValue('neighborhood', { label: 'Section D', value: '10' });
    } else if (sectionE.includes(str)) {
      setFieldValue('neighborhood', { label: 'Section E', value: '11' });
    } else if (sectionF.includes(str)) {
      setFieldValue('neighborhood', { label: 'Section F', value: '12' });
    } else if (hijo.includes(str)) {
      setFieldValue('neighborhood', { label: 'HIJO', value: '13' });
    } else if (klmpq.includes(str)) {
      setFieldValue('neighborhood', { label: 'KLMPQ', value: '14' });
    } else if (crownPoint.includes(str)) {
      setFieldValue('neighborhood', { label: 'Crown Point', value: '15' });
    } else if (spinDrift.includes(str)) {
      setFieldValue('neighborhood', { label: 'Spindrift', value: '6' });
    } else if (pineIsland.includes(str)) {
      setFieldValue('neighborhood', { label: 'Pine Island', value: '5' });
    } else if (buckIsland.includes(str)) {
      setFieldValue('neighborhood', { label: 'Buck Island', value: '16' });
    } else if (oceanHill.includes(str)) {
      setFieldValue('neighborhood', { label: 'Ocean Hill', value: '1' });
    } else if (corollaLight.includes(str)) {
      setFieldValue('neighborhood', { label: 'Corolla Light', value: '2' });
    } else if (cruzBay.includes(str)) {
      setFieldValue('neighborhood', {
        label: 'Cruz Bay (Soundfront at Corolla Bay)',
        value: '19',
      });
    } else if (whalehead.includes(str)) {
      setFieldValue('neighborhood', { label: 'Whalehead', value: '3' });
    } else if (whaleheadRight.includes(str)) {
      setFieldValue('neighborhood', { label: 'Whalehead Right', value: '18' });
    } else if (monterayShores.includes(str)) {
      setFieldValue('neighborhood', { label: 'Monteray Shores', value: '17' });
    } else if (currituckClub.includes(str)) {
      setFieldValue('neighborhood', { label: 'Currituck Club', value: '4' });
    }
  }, [values['delivery_address']]);

  return (
    <div className='mb-4'>
      <Dropdown
        className='bg-transparent border-primary border-2 w-80'
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
