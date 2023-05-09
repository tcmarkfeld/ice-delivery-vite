// import { StyleSheet, TouchableOpacity } from "react-native";
import Text from './Text';
import { Button } from 'react-bootstrap';

interface AppButtonProps {
  title: string;
  onPress?: () => void;
}

function AppButton({ title, onPress }: AppButtonProps) {
  return (
    <Button
      className={'flex bg-primary rounded-lg p-4 m-5 items-center justify-center'}
      onClick={onPress}
    >
      <Text style={'text-white text-md uppercase tracking-medium text-bold text-center'}>
        {title}
      </Text>
    </Button>
  );
}

export default AppButton;
