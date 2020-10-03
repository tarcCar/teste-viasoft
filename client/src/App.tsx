import { ThemeProvider } from "@material-ui/core";
import React from "react";

import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import { Provider } from "react-redux";
import Routes from "./routes";
import store from "./store";

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Routes />
      </Provider>
    </ThemeProvider>
  );
}
export default App;
