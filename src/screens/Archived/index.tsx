import React, { useState, useCallback } from 'react';
import { FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import {
  Container,
  Package,
  MetaContainer,
  PackageTitle,
  PackageCode,
  IconContainer,
  OptionsContainer,
  Button,
} from './styles';
import { useTheme } from '../../hooks/theme';
import SearchBar from '../../components/SearchBar';
import { usePackagesReducer } from '../../hooks/packages';

const Archived: React.FC = () => {
  const { theme } = useTheme();

  const { packagesState } = usePackagesReducer();

  const [searchFocused, setSearchFocused] = useState(false);

  const handleDeletePackage = useCallback((id: string) => {
    Alert.alert(
      'Aviso!',
      'Deseja mesmo deletar este pacote?\nA ação não pode ser desfeita',
      [
        {
          text: 'Sim',
          style: 'destructive',
          onPress: () => {
            dispatch({
              type: 'DELETE_PACKAGE',
              payload: { id },
            });
          },
        },
        {
          text: 'Cancelar',
          style: 'cancel',
        },
      ],
      { cancelable: true },
    );
  }, []);

  return (
    <Container>
      <SearchBar
        onFocus={() => setSearchFocused(true)}
        onBlur={() => setSearchFocused(false)}
        focused={searchFocused}
        placeholderTextColor={theme.colors.text_secondary}
        placeholder="Digite o nome do pacote"
      />
      <FlatList
        data={packagesState.archived}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Package>
            <IconContainer>
              <Icon name="package" size={30} color="#fff" />
            </IconContainer>
            <MetaContainer>
              <PackageTitle>{item.title}</PackageTitle>
              <PackageCode>{item.code}</PackageCode>
            </MetaContainer>
            <OptionsContainer>
              <Button
                color="#e76f51"
                onPress={() => handleDeletePackage(item.id)}>
                <Icon name="trash" size={20} color="#fff" />
              </Button>
            </OptionsContainer>
          </Package>
        )}
        contentContainerStyle={{ paddingTop: 10 }}
      />
    </Container>
  );
};

export default Archived;
