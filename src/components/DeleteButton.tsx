import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'react-bootstrap';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';

interface DeleteButtonProps {
  onPress?: () => void;
}

function DeleteButton({ onPress }: DeleteButtonProps) {
  return (
    <Button
      className={'flex bg-error rounded-lg p-4 m-5 items-center justify-center'}
      onClick={onPress}
    >
      <FontAwesomeIcon icon={faTrashCan} size='lg' />
    </Button>
  );
}

export default DeleteButton;
