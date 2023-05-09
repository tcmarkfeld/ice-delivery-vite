import { Form } from 'react-bootstrap';

interface AppTextInputProps {
  // label: string;
  type: string;
  [key: string]: any; // any other prop
  width: string;
}

function AppTextInput({ type, width, ...otherTextInputProps }: AppTextInputProps) {
  return (
    <Form.Group className={`mb-3`}>
      {/* <Form.Label>{}</Form.Label> */}
      <Form.Control
        className={`border-2 border-grey bg-transparent text-black text-md tracking-small ${width} h-16 focus:w-fit`}
        type={type}
        // value={placeholder}
        {...otherTextInputProps}
      />
    </Form.Group>
  );
}

export default AppTextInput;
