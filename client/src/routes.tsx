import React, { Suspense } from "react";
import { Redirect, Route, Router, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import RouteWithLayout from "./components/RotaComLayout";
import setUpAxios from "./api";
import CadastroFeedback from "./pages/Feedback/Cadastro";
import CadastroUsuario from "./pages/Usuario/Cadastro";

const Home = React.lazy(() => import("./pages/Home"));
const Login = React.lazy(() => import("./pages/Login"));
const browserHistory = createBrowserHistory();

// Coloca no axios o history para quando o JWT expirar redirecionar pra tela de login
setUpAxios(browserHistory);

const Routes = () => (
  <Router history={browserHistory}>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route component={Login} path="/login" />
        <RouteWithLayout component={Home} path="/home" />
        <RouteWithLayout
          component={CadastroFeedback}
          path="/feedback/cadastro"
        />
        <RouteWithLayout component={CadastroUsuario} path="/usuario/cadastro" />
      </Switch>
    </Suspense>
  </Router>
);

export default Routes;
