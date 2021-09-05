import styled from 'styled-components/native';
import { FlatList } from 'react-native';

export interface TrackEvent {
  data: string;
  hora: string;
  descricao: string;
  criacao: string;
  unidade: {
    tipounidade: string;
    cidade: string;
    uf: string;
  };
}

interface IPackage {
  id: string;
  title: string;
  code: string;
  events: TrackEvent[];
  updated_at: string;
  hasUpdate: boolean;
}

interface IIconButtonProps {
  color?: string;
}

interface IButtonProps {
  selected?: boolean;
}

interface IButtonTextProps {
  selected?: boolean;
}

export const Container = styled.View`
  flex: 1;
  background: ${props => props.theme.colors.background_primary};
`;

export const Package = styled.View`
  flex-direction: row;
  align-items: center;
  background: ${props => props.theme.colors.surface};
  padding: 12px 8px;
  margin: 0 12px;
  margin-bottom: 8px;
  border-radius: 10px;
  elevation: 1;
`;

export const IconContainer = styled.View`
  padding: 8px;
  border-radius: 10px;
  background: #f1ac38;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MetaContainer = styled.View`
  margin: 0 8px;
  flex: 1;
`;

export const PackageTitle = styled.Text`
  color: ${props => props.theme.colors.text_secondary};
  font-size: 20px;
  font-family: 'Poppins-Regular';
`;

export const PackageCode = styled.Text`
  color: ${props => props.theme.colors.text_primary};
  font-family: 'Poppins-Medium';
  font-size: 18px;
  margin-top: -5px;
`;

export const OptionsContainer = styled.View``;

export const Button = styled.TouchableOpacity<IIconButtonProps>`
  padding: 8px;
  border: 0;
  border-radius: 5px;
  margin: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.color || props.theme.colors.primary};
`;

export const FilterContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 8px 12px;
`;

export const PendingButton = styled.TouchableOpacity<IButtonProps>`
  background: ${props =>
    props.selected ? props.theme.colors.primary : props.theme.colors.surface};
  padding: 12px 8px;
  border-radius: 10px;
  width: 48%;
  elevation: 1;
`;

export const DeliveredButton = styled.TouchableOpacity<IButtonProps>`
  background: ${props =>
    props.selected ? props.theme.colors.primary : props.theme.colors.surface};
  padding: 12px 8px;
  border-radius: 10px;
  width: 48%;
  elevation: 1;
`;

export const PendingButtonText = styled.Text<IButtonTextProps>`
  font-family: 'Poppins-Medium';
  color: ${props =>
    props.selected ? '#ffffff' : props.theme.colors.text_primary};
  font-size: 16px;
`;

export const DeliveredButtonText = styled.Text<IButtonTextProps>`
  font-family: 'Poppins-Medium';
  color: ${props =>
    props.selected ? '#ffffff' : props.theme.colors.text_primary};
  font-size: 16px;
`;
