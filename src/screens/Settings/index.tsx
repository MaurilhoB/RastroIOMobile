import React from 'react';

import { useTheme } from '../../hooks/theme';

import { Container, SettingItem, SettingText, Switch } from './styles';

const Settings: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Container>
      <SettingItem>
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
      <SettingItem>
        <Switch
          value={true}
          thumbColor={theme.colors.primary}
          trackColor={{
            true: '#baacec',
            false: theme.colors.background_primary,
          }}
        />
        <SettingText>Atualizar pacotes ao iniciar</SettingText>
      </SettingItem>
    </Container>
  );
};

export default Settings;
