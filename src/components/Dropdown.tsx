import { FormikValues, useFormikContext } from 'formik';

// import AppErrorMessage from './form/FormErrorMessage';
import Dropdown from 'react-dropdown';
import { FormErrorMessage } from './form';

interface DropdownComponentProps {
  name: string;
  data: { label: string; value: string }[];
}

function DropdownComponent({ name, data, ...otherTextInputProps }: DropdownComponentProps) {
  const { setFieldValue, values, errors, touched } = useFormikContext<FormikValues>();

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

export default DropdownComponent;
