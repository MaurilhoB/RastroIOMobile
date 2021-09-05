import styled from 'styled-components/native';

interface IContainerProps {
  focused?: boolean;
}

export const Container = styled.View<IContainerProps>`
  background: ${props => props.theme.colors.surface};
  flex-direction: row;
  align-items: center;
  padding: 10px 8px;
  margin: 4px 10px 4px;
  border-radius: 10px;
  border: 2px solid
    ${props => (props.focused ? props.theme.colors.primary : 'transparent')};
`;

export const SInput = styled.TextInput`
  flex: 1;
  font-family: 'Poppins-Regular';
  font-size: 16px;
  color: ${props => props.theme.colors.text_primary};
`;
