import { FormikErrors, FormikTouched } from 'formik';
import Text from '../Text';

interface ErrorMessageProps {
  error: string | string[] | FormikErrors<any> | FormikErrors<any>[] | undefined;
  visible: boolean | FormikTouched<any> | FormikTouched<any>[] | undefined;
}

function ErrorMessage({ error, visible }: ErrorMessageProps) {
  if (!visible || !error) return null;

  return <Text style='text-error'>{error}</Text>;
}

export default ErrorMessage;
