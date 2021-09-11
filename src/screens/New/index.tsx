import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import Input from '../../components/Input';
import { usePackagesReducer } from '../../hooks/packages';
import { useTheme } from '../../hooks/theme';

import { Container, Form, SubmitButton, SubmitButtonText } from './styles';

const New: React.FC = () => {
  const { theme } = useTheme();
  const { dispatch } = usePackagesReducer();
  const navigation = useNavigation();

  const [code, setCode] = useState('');
  const [name, setName] = useState('');

  const [nameFocused, setNameFocused] = useState(false);
  const [codeFocused, setCodeFocused] = useState(false);

  const handleOnSubmit = useCallback(() => {
    if (!code || !name) {
      return Alert.alert('Aviso', 'Preencha todos os campos');
    }
    dispatch({
      type: 'CREATE_PACKAGE',
      payload: {
        title: name,
        code: code.toUpperCase(),
      },
    });
    navigation.goBack();
  }, [name, code]);

  return (
    <Container>
      <Form>
        <Input
          value={name}
          focused={nameFocused}
          placeholder="Nome"
          placeholderTextColor={theme.colors.text_secondary}
          onChangeText={value => setName(value)}
          onFocus={() => setNameFocused(true)}
          onBlur={() => setNameFocused(false)}
        />
        <Input
          value={code}
          autoCapitalize="characters"
          focused={codeFocused}
          placeholder="Código de rastreamento"
          placeholderTextColor={theme.colors.text_secondary}
          onChangeText={value => setCode(value)}
          onFocus={() => setCodeFocused(true)}
          onBlur={() => setCodeFocused(false)}
        />
        <SubmitButton onPress={handleOnSubmit}>
          <Icon name="file-plus" color="#fff" size={20} />
          <SubmitButtonText>Adicionar</SubmitButtonText>
        </SubmitButton>
      </Form>
    </Container>
  );
};

export default New;
