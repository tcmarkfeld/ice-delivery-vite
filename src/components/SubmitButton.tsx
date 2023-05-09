import { useFormikContext } from 'formik';

import Button from './Button';

interface SubmitButtonProps {
  title: string;
}

function SubmitButton({ title }: SubmitButtonProps) {
  const { handleSubmit } = useFormikContext();

  return <Button title={title} onPress={handleSubmit} />;
}

export default SubmitButton;
