import { FormikErrors, FormikTouched } from 'formik';
import TextInput from '../TextInput';

interface ErrorMessageProps {
  error: FormikErrors<any>;
  visible: FormikTouched<any>;
}

function ErrorMessage({ error, visible }: ErrorMessageProps) {
  if (!visible || !error) return null;

  return (
    <TextInput width='w-max' className='text-red' label={''} type={''} placeholder={''}>
      {error}
    </TextInput>
  );
}

export default ErrorMessage;
