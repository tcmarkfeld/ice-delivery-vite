import { FormikValues, useFormikContext } from 'formik';

import { FormErrorMessage } from '.';
import 'react-phone-number-input/style.css';
import Input from 'react-phone-number-input/input';
import './phone.css';

interface PhoneFormFieldProps {
  name: string;
  width: string;
}

function PhoneFormField({ name, width }: PhoneFormFieldProps) {
  const { setFieldTouched, setFieldValue, values, errors, touched } =
    useFormikContext<FormikValues>();

  return (
    <div className=''>
      <p>Phone Number</p>
      <Input
        className={`border-2 border-primary bg-lightgrey hover:bg-lightgrey text-black text-md tracking-small ${width} h-12 rounded-lg default:[color-scheme:dark] pl-2`}
        value={values[name]}
        defaultCountry={'US'}
        autoComplete='new-password'
        international={false}
        onBlur={() => setFieldTouched(name)}
        onChange={(value: any) => {
          setFieldValue('customer_phone', value);
        }}
      />
      {errors[name] && touched[name] ? null : <h6> </h6>}
      <FormErrorMessage error={errors[name]} visible={touched[name]} />
    </div>
  );
}

export default PhoneFormField;
