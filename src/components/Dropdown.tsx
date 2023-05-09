import { FormikValues, useFormikContext } from 'formik';

// import AppErrorMessage from './form/FormErrorMessage';
import Dropdown from 'react-dropdown';

interface FormFieldProps {
  name: string;
  data: { label: string; value: string }[];
}

function FormField({ name, data, ...otherTextInputProps }: FormFieldProps) {
  const { setFieldValue, values, errors, touched } = useFormikContext<FormikValues>();

  return (
    <div className='mb-4'>
      <Dropdown
        className='border-2 border-grey bg-transparent w-28 h-16'
        options={data}
        onChange={(event: any) => setFieldValue(name, event.value)}
        value={values[name]}
        {...otherTextInputProps}
      />
      {errors[name] && touched[name] ? null : <h6> </h6>}
      {/* <AppErrorMessage error={errors[name]} visible={touched[name]} /> */}
    </div>
  );
}

export default FormField;
