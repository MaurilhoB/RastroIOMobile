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
  CreatePackageButton,
  CreatePackageButtonText,
} from './styles';

import { useTheme } from '../../hooks/theme';
import SearchBar from '../../components/SearchBar';

import { usePackagesReducer } from '../../hooks/packages';

import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const Main: React.FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation<
    NativeStackNavigationProp<ParamListBase, any>
  >();

  const [searchFocused, setSearchFocused] = useState(false);

  const { dispatch, packagesState } = usePackagesReducer();

  const handleNewPackage = useCallback(() => {
    navigation.navigate('New');
  }, []);

  const handleEditPackage = useCallback((userPackage: object) => {
    navigation.navigate('Edit', { package: userPackage });
  }, []);

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
          <>
            <CreatePackageButton onPress={handleNewPackage}>
              <Icon name="file-plus" size={20} color="#FFF" />
              <CreatePackageButtonText>Adicionar Novo</CreatePackageButtonText>
            </CreatePackageButton>
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
          </>
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
              <Button color="#4895ef" onPress={() => handleEditPackage(item)}>
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
