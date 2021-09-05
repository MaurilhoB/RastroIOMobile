import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: ${props => props.theme.colors.background_primary};
  justify-content: center;
`;

export const Form = styled.ScrollView`
  margin-top: 50%;
`;

export const SubmitButton = styled.TouchableOpacity`
  background: ${props => props.theme.colors.primary};
  padding: 18px 8px;
  margin: 12px;
  border-radius: 10px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const SubmitButtonText = styled.Text`
  font-family: 'Poppins-Medium';
  font-size: 16px;
  color: #fff;
  margin-left: 4px;
  margin-top: 4px;
`;
