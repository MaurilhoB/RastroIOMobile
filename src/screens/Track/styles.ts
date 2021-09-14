import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: ${props => props.theme.colors.background_primary};
`;

export const TrackingContainer = styled.ScrollView``;

export const OptionsContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ReceivedButton = styled.TouchableOpacity`
  width: 48%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 10px;
  border: 0;

  background: #00e676;
`;

export const ReceivedButtonText = styled.Text`
  font-size: 16px;
  font-family: 'Poppins-Medium';
  margin-top: 4px;
  margin-left: 4px;
  color: #fff;
`;

export const ArchiveButton = styled.TouchableOpacity`
  width: 48%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 10px;
  border: 0;
  elevation: 1;

  background: #f1ac38;
`;

export const ArchiveButtonText = styled.Text`
  font-size: 16px;
  font-family: 'Poppins-Medium';
  margin-top: 4px;
  margin-left: 4px;
  color: #fff;
`;

export const MainStatus = styled.View`
  background: ${props => props.theme.colors.surface};
  margin: 10px 0px 30px;
  padding: 20px;
  border-radius: 10px;
  elevation: 1;
`;

export const MainStatusTitle = styled.Text`
  color: ${props => props.theme.colors.text_primary};

  font-family: 'Poppins-Medium';
  font-size: 20px;
`;

export const Status = styled.View`
  padding: 20px;
  margin-bottom: 10px;
  border-radius: 10px;
  background: ${props => props.theme.colors.surface};
  elevation: 1;
`;

export const Row = styled.View`
  flex-direction: row;
`;

export const RowText = styled.Text`
  font-family: 'Poppins-Regular';
  color: ${props => props.theme.colors.text_primary};
  font-size: 14px;
`;

export const Bold = styled.Text`
  font-family: 'Poppins-Bold';
`;

export const Center = styled.View`
  flex: 1;
  background: ${props => props.theme.colors.background_primary};
  align-items: center;
  justify-content: center;
`;

export const ErrorContainer = styled.View`
  padding: 10px;
`;

export const ErrorTitle = styled.Text`
  color: ${props => props.theme.colors.text_primary};
  font-size: 20px;
  font-family: 'Poppins-Bold';
`;

export const ErrorMessage = styled.Text`
  color: ${props => props.theme.colors.text_secondary};
  font-family: 'Poppins-Regular';
  font-size: 14px;
`;
