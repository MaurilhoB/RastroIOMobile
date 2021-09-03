import React from 'react';
import AppThemeProvider from './theme';

const AppProvider: React.FC = ({ children }) => (
  <AppThemeProvider>{children}</AppThemeProvider>
);

export default AppProvider;
