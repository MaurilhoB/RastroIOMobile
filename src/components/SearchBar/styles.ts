import styled from 'styled-components/native';

interface IContainerProps {
  focused: boolean;
}

export const Container = styled.View<IContainerProps>`
  flex-direction: row;
  align-items: center;
  padding: 8px 10px;
  margin: 0 10px;
  margin-top: 12px;
  border-radius: 10px;
  background: ${props => props.theme.colors.surface};
  border: 2px solid
    ${props => (props.focused ? props.theme.colors.primary : 'transparent')};
`;

export const Input = styled.TextInput`
  flex: 1;
  font-family: 'Poppins-Regular';
  font-size: 16px;
  color: ${props => props.theme.colors.primary};
`;
