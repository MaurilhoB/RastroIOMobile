import React, { useState, useCallback, useMemo, useRef } from 'react';
import { FlatList, Alert } from 'react-native';
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

import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import NothingHere from '../../components/NothingHere';

const Archived: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<ParamListBase, any>>();

  const listRef = useRef<FlatList>(null);

  const { theme } = useTheme();

  const { packagesState, dispatch } = usePackagesReducer();

  const [searchFocused, setSearchFocused] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const archivedPackages = useMemo(() => {
    return packagesState.archived.filter(packageData => {
      if (
        packageData.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        packageData.code.toLowerCase().includes(searchValue.toLowerCase())
      ) {
        return true;
      }
      return false;
    });
  }, [packagesState.archived, searchValue]);

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

  const handleTrackPackage = useCallback((packageData: object) => {
    navigation.navigate('Track', { package: packageData });
  }, []);

  const handleSearchPackage = useCallback((value: string) => {
    setSearchValue(value);
  }, []);

  return (
    <Container>
      <SearchBar
        onFocus={() => {
          setSearchFocused(true);
          if (archivedPackages.length) {
            listRef.current?.scrollToIndex({ index: 0, animated: true });
          }
        }}
        onBlur={() => setSearchFocused(false)}
        onChangeText={handleSearchPackage}
        focused={searchFocused}
        placeholderTextColor={theme.colors.text_secondary}
        placeholder="Digite o nome do pacote"
      />
      <FlatList
        data={archivedPackages}
        ref={listRef}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        ListEmptyComponent={NothingHere}
        renderItem={({ item }) => (
          <Package
            activeOpacity={0.9}
            onPress={() => handleTrackPackage(item)}
            onLongPress={() => handleDeletePackage(item.id)}>
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
        contentContainerStyle={{ paddingTop: 10, flexGrow: 1 }}
      />
    </Container>
  );
};

export default Archived;
