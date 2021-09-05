import React from 'react';
import { TextInputProps } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { Container, SInput } from './styles';

interface IInputProps extends TextInputProps {
  focused?: boolean;
  icon?: string;
  iconColor?: string;
}
const Input: React.FC<IInputProps> = ({
  focused,
  icon,
  iconColor,
  ...rest
}) => {
  return (
    <Container focused={focused}>
      {icon && <Icon name={icon} size={22} color={iconColor} />}
      <SInput {...rest} />
    </Container>
  );
};

export default Input;
