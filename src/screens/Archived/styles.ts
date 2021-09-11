import styled from 'styled-components/native';

interface IIconButtonProps {
  color?: string;
}

export const Container = styled.View`
  flex: 1;
  background: ${props => props.theme.colors.background_primary};
`;

export const Package = styled.TouchableOpacity`
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
