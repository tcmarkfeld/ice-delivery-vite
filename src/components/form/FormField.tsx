import { FormikValues, useFormikContext } from 'formik';

// import AppErrorMessage from './FormErrorMessage';
import TextInput from '../TextInput';

interface FormFieldProps {
  name: string;
  type: string;
  width: string;
}

function FormField({ name, type, width, ...otherTextInputProps }: FormFieldProps) {
  const { setFieldTouched, setFieldValue, values, errors, touched } =
    useFormikContext<FormikValues>();

  return (
    <div className=''>
      <TextInput
        type={type}
        width={width}
        onChange={(event: any) => setFieldValue(name, event.target.value)}
        value={values[name]}
        onBlur={() => setFieldTouched(name)}
        {...otherTextInputProps}
      />
      {errors[name] && touched[name] ? null : <h6> </h6>}
      {/* <AppErrorMessage error={errors[name]} visible={touched[name]} /> */}
    </div>
  );
}

export default FormField;
