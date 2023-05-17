import { FormikValues, useFormikContext } from 'formik';

import TextInput from '../TextInput';
import { FormErrorMessage } from '.';

interface FormFieldProps {
  name: string;
  label: string;
  type: string;
  width: string;
}

function FormField({ name, type, width, label, ...otherTextInputProps }: FormFieldProps) {
  const { setFieldTouched, setFieldValue, values, errors, touched } =
    useFormikContext<FormikValues>();

  return (
    <div className=''>
      <TextInput
        type={type}
        width={width}
        label={label}
        onChange={(event: any) => setFieldValue(name, event.target.value)}
        value={values[name]}
        onBlur={() => setFieldTouched(name)}
        {...otherTextInputProps}
      />
      {errors[name] && touched[name] ? null : <h6> </h6>}
      <FormErrorMessage error={errors[name]} visible={touched[name]} />
    </div>
  );
}

export default FormField;
