import {
  ParamListBase,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import Input from '../../components/Input';
import { usePackagesReducer } from '../../hooks/packages';
import { useTheme } from '../../hooks/theme';

import { Container, Form, SubmitButton, SubmitButtonText } from './styles';

interface IRouteParams extends ParamListBase {
  route: {
    params: {
      package: {
        id: string;
        title: string;
        code: string;
        events: [];
        updated_at: string;
        hasUpdate: boolean;
      };
    };
  };
}

const Edit: React.FC<IRouteParams> = ({ route }) => {
  const { theme } = useTheme();
  const { dispatch } = usePackagesReducer();

  const navigation = useNavigation();

  const [code, setCode] = useState('');
  const [name, setName] = useState('');

  const [nameFocused, setNameFocused] = useState(false);
  const [codeFocused, setCodeFocused] = useState(false);

  useEffect(() => {
    const { code, title } = route.params.package;
    setName(title);
    setCode(code);
  }, []);

  const handleOnSubmit = useCallback(() => {
    const packageData = route.params.package;

    if (!code || !name) {
      return Alert.alert('Aviso', 'Preencha todos os campos');
    }
    dispatch({
      type: 'UPDATE_PACKAGE',
      payload: {
        ...packageData,
        title: name,
        code: code.toUpperCase(),
        events: [],
        hasUpdate: false,
        updated_at: new Date().toISOString(),
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
          keyboardAppearance={theme.title === 'dark' ? 'dark' : 'light'}
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
          keyboardAppearance={theme.title === 'dark' ? 'dark' : 'light'}
          placeholder="Código de rastreamento"
          placeholderTextColor={theme.colors.text_secondary}
          onChangeText={value => setCode(value)}
          onFocus={() => setCodeFocused(true)}
          onBlur={() => setCodeFocused(false)}
        />
        <SubmitButton onPress={handleOnSubmit}>
          <Icon name="save" color="#fff" size={20} />
          <SubmitButtonText>Salvar</SubmitButtonText>
        </SubmitButton>
      </Form>
    </Container>
  );
};

export default Edit;
