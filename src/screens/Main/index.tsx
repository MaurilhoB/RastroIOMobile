import React, {
  useState,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { Alert, FlatList, RefreshControl } from 'react-native';
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
import api from '../../services/api';
import NothingHere from '../../components/NothingHere';

interface TrackEvent {
  data: string;
  hora: string;
  descricao: string;
  criacao: string;
  destino?: [
    {
      local: string;
      cidade: string;
      uf: string;
    },
  ];
  unidade: {
    tipounidade: string;
    cidade: string;
    uf: string;
  };
}

interface AxiosTrackResponse {
  objeto: [
    {
      categoria: string;
      evento: TrackEvent[];
    },
  ];
}

const Main: React.FC = () => {
  const { theme } = useTheme();
  const navigation =
    useNavigation<NativeStackNavigationProp<ParamListBase, any>>();
  const listRef = useRef<FlatList>(null);

  const { dispatch, packagesState } = usePackagesReducer();

  const [searchFocused, setSearchFocused] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<'pending' | 'delivered'>(
    'pending',
  );
  const [searchValue, setSearchValue] = useState('');

  const pendingPackages = useMemo(() => {
    return packagesState.pending.filter(packageData => {
      if (
        packageData.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        packageData.code.toLowerCase().includes(searchValue.toLowerCase())
      ) {
        return true;
      }
      return false;
    });
  }, [packagesState.pending, searchValue]);

  const deliveredPackages = useMemo(() => {
    return packagesState.delivered.filter(packageData => {
      if (
        packageData.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        packageData.code.toLowerCase().includes(searchValue.toLowerCase())
      ) {
        return true;
      }
      return false;
    });
  }, [packagesState.delivered, searchValue]);

  const updatePackages = useCallback(() => {
    const packagesToUpdate = packagesState.pending.filter(packageData => {
      if (packageData?.updated_at && packageData.events.length) {
        const lastUpdate = new Date(packageData.updated_at).getTime();
        const now = new Date().getTime();

        if (now - lastUpdate < 600000) {
          return false;
        }
      }
      return true;
    });

    packagesToUpdate.forEach(packageData => {
      api
        .post<AxiosTrackResponse>('rastreio', {
          code: packageData.code,
          type: 'LS',
        })
        .then(response => {
          if (!response.data.objeto[0].categoria.includes('ERRO')) {
            dispatch({
              type: 'UPDATE_PACKAGE',
              payload: {
                ...packageData,
                events: response.data.objeto[0].evento,
                updated_at: new Date().toISOString(),
                hasUpdate: packageData.hasUpdate
                  ? true
                  : response.data.objeto[0].evento.length >
                    packageData.events.length,
              },
            });
          }
        })
        .catch(e => {
          console.log(e);
        });
    });
    setRefreshing(false);
  }, [packagesState]);

  useEffect(() => {
    navigation.addListener('focus', updatePackages);
    return () => navigation.removeListener('focus', updatePackages);
  }, [updatePackages]);

  const handleOnRefresh = useCallback(() => {
    setRefreshing(true);
    updatePackages();
  }, []);

  const handleNewPackage = useCallback(() => {
    navigation.navigate('New');
  }, []);

  const handleEditPackage = useCallback((packageData: object) => {
    navigation.navigate('Edit', { package: packageData });
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

  const handleTrackPackage = useCallback((packageData: object) => {
    navigation.navigate('Track', { package: packageData });
  }, []);

  const handleSearchPackage = useCallback((value: string) => {
    setSearchValue(value);
  }, []);

  const HeaderComponent: React.FC = () => (
    <>
      <CreatePackageButton onPress={handleNewPackage}>
        <Icon name="file-plus" size={20} color="#FFF" />
        <CreatePackageButtonText>Adicionar Novo</CreatePackageButtonText>
      </CreatePackageButton>
      <FilterContainer>
        <PendingButton
          selected={selectedFilter === 'pending'}
          onPress={() => setSelectedFilter('pending')}>
          <PendingButtonText selected={selectedFilter === 'pending'}>
            Pendentes
          </PendingButtonText>
        </PendingButton>
        <DeliveredButton
          selected={selectedFilter === 'delivered'}
          onPress={() => setSelectedFilter('delivered')}>
          <DeliveredButtonText selected={selectedFilter === 'delivered'}>
            Entregues
          </DeliveredButtonText>
        </DeliveredButton>
      </FilterContainer>
    </>
  );

  return (
    <Container>
      <SearchBar
        onFocus={() => {
          setSearchFocused(true);
          const selected =
            selectedFilter === 'pending' ? pendingPackages : deliveredPackages;

          if (selected.length) {
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
        data={
          selectedFilter === 'pending' ? pendingPackages : deliveredPackages
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleOnRefresh} />
        }
        ref={listRef}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={searchFocused ? null : NothingHere}
        ListHeaderComponent={HeaderComponent}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Package
            key={item.id}
            hasUpdate={item.hasUpdate}
            activeOpacity={0.8}
            onPress={() => handleTrackPackage(item)}>
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
        contentContainerStyle={{ paddingTop: 10, flexGrow: 1 }}
      />
    </Container>
  );
};

export default Main;
