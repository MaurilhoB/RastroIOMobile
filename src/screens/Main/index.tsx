import React, { useState, useCallback } from 'react';
import { Alert, FlatList } from 'react-native';
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
  FilterContainer,
  PendingButton,
  PendingButtonText,
  DeliveredButton,
  DeliveredButtonText,
} from './styles';

import { useTheme } from '../../hooks/theme';
import SearchBar from '../../components/SearchBar';

import { usePackagesReducer } from '../../hooks/packages';

const Main: React.FC = () => {
  const { theme } = useTheme();

  const [searchFocused, setSearchFocused] = useState(false);
  const { dispatch, packagesState } = usePackagesReducer();

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
        data={packagesState.pending}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <FilterContainer>
            <PendingButton
              selected={true}
              onPress={() => {
                dispatch({
                  type: 'CREATE_PACKAGE',
                  payload: {
                    title: 'Nova encomenda',
                    code: 'Entendo',
                  },
                });
              }}>
              <PendingButtonText selected={true}>Pendentes</PendingButtonText>
            </PendingButton>
            <DeliveredButton>
              <DeliveredButtonText>Entregues</DeliveredButtonText>
            </DeliveredButton>
          </FilterContainer>
        )}
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
              <Button color="#4895ef">
                <Icon name="edit" size={20} color="#fff" />
              </Button>
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

export default Main;
