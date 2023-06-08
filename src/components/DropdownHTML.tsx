import { FormikValues, useFormikContext } from 'formik';
import { FormErrorMessage } from './form';

interface DropdownHTMLProps {
  options: { label: string; value: string }[];
  label: string;
  name: string;
}

const DropdownHTML = ({ name, options, label }: DropdownHTMLProps) => {
  const { setFieldValue, values, errors, touched } = useFormikContext<FormikValues>();

  return (
    <div className='flex flex-col'>
      <label>{label}</label>
      <select
        value={values[name]}
        onChange={(event: any) => setFieldValue(name, event.target.value)}
        className='border-2 border-primary bg-lightgrey hover:bg-lightgrey text-black text-md tracking-small w-80 h-12 rounded-lg default:[color-scheme:dark] pl-2'
      >
        <option value={'null'}>Select...</option>
        {options.map((option, index) => (
          <option value={option.value} key={index}>
            {option.label}
          </option>
        ))}
      </select>
      {errors[name] && touched[name] ? null : <h6> </h6>}
      <FormErrorMessage error={errors[name]} visible={touched[name]} />
    </div>
  );
};
export default DropdownHTML;
