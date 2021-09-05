import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: ${props => props.theme.colors.background_primary};
  padding: 5px 0;
`;

export const SettingItem = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 12px 8px;
  background: ${props => props.theme.colors.surface};
  border-bottom-width: 0.5px;
  border-bottom-color: ${props => props.theme.colors.border};
`;

export const SettingText = styled.Text`
  font-size: 18px;
  font-family: 'Poppins-Regular';
  color: ${props => props.theme.colors.text_primary};
`;

export const Switch = styled.Switch`
  margin-right: 8px;
`;
