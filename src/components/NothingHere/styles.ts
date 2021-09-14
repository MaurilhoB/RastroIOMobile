import styled from 'styled-components/native';
import Space from '../../assets/space.svg';

export const Container = styled.View``;

export const Image = styled(Space)`
  height: 70%;
`;

export const Title = styled.Text`
  margin: 0 auto;
  font-size: 22px;
  font-family: 'Poppins-Medium';
  color: ${props => props.theme.colors.text_primary};
`;
