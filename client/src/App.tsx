import { ThemeProvider } from '@material-ui/core';
import React from 'react';

import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import Routes from './routes';

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  );
}
export default App;
