import { Form } from 'react-bootstrap';

interface AppTextInputProps {
  type: string;
  label: string;
  [key: string]: any; // any other prop
  width: string;
}

function AppTextInput({ type, width, label, ...otherTextInputProps }: AppTextInputProps) {
  return (
    <Form.Group className={`mb-3 flex flex-col`}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        className={`border-2 border-primary bg-lightgrey hover:bg-lightgrey text-black text-md tracking-small ${width} h-12 rounded-lg default:[color-scheme:dark] pl-2`}
        type={type}
        autoComplete='new-password'
        {...otherTextInputProps}
      />
    </Form.Group>
  );
}

export default AppTextInput;
