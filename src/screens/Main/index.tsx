import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';

import {
  Container,
  FlatList,
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

const Main: React.FC = () => {
  const { toggleTheme, theme } = useTheme();
  const fakeData = new Array(10).fill(null);

  const [searchFocused, setSearchFocused] = useState(false);

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
        data={fakeData}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <FilterContainer>
            <PendingButton selected={true} onPress={toggleTheme}>
              <PendingButtonText selected={true}>Pendentes</PendingButtonText>
            </PendingButton>
            <DeliveredButton>
              <DeliveredButtonText>Entregues</DeliveredButtonText>
            </DeliveredButton>
          </FilterContainer>
        )}
        keyExtractor={(item, index) => String(index)}
        renderItem={() => (
          <Package>
            <IconContainer>
              <Icon name="package" size={30} color="#fff" />
            </IconContainer>
            <MetaContainer>
              <PackageTitle>Encomenda 1</PackageTitle>
              <PackageCode>PC565982256BR</PackageCode>
            </MetaContainer>
            <OptionsContainer>
              <Button color="#4895ef">
                <Icon name="edit" size={20} color="#fff" />
              </Button>
              <Button color="#e76f51">
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
