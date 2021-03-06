import React from 'react';

import { useTheme } from '../../hooks/theme';

import { Container, SettingItem, SettingText, Switch } from './styles';

const Settings: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Container>
      <SettingItem activeOpacity={1} onPress={toggleTheme}>
        <Switch
          value={theme.title === 'dark'}
          thumbColor={theme.colors.primary}
          trackColor={{
            true: '#baacec',
            false: theme.colors.background_primary,
          }}
          onChange={toggleTheme}
        />
        <SettingText>
          Tema: {theme.title === 'dark' ? 'Escuro' : 'Claro'}
        </SettingText>
      </SettingItem>
    </Container>
  );
};

export default Settings;
