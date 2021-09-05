import React from 'react';
import AppThemeProvider from './theme';
import PackagesProvider from './packages';

const AppProvider: React.FC = ({ children }) => (
  <AppThemeProvider>
    <PackagesProvider>{children}</PackagesProvider>
  </AppThemeProvider>
);

export default AppProvider;
