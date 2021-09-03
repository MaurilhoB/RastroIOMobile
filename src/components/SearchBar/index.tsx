import React from 'react';

import { Container, Input } from './styles';
import { TextInputProps } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

interface SearchBarProps extends TextInputProps {
  focused?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ focused = false, ...rest }) => (
  <Container focused={focused}>
    <Input {...rest}></Input>
    <Icon name="search" size={22} color="#919097" />
  </Container>
);

export default SearchBar;
