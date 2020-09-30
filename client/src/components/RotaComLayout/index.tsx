import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import Layout from '../Layout';

interface RouteWithLayoutProps extends RouteProps{
}
const RouteWithLayout:React.FC<RouteWithLayoutProps> = (props) => {
  const { component, ...rest } = props;
  const Component = component as any;
  // Se ainda tem o token no local storage então está logado,
  // usei o localstorage em vez do redux do login por causa se o usuario recarregar a pagina
  const loginSucesso = localStorage.getItem('token');
  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <Layout>
          {loginSucesso ? (
            <Component {...matchProps} />
          ) : (
            <Redirect to="/login" />
          )}
        </Layout>
      )}
    />
  );
};

export default RouteWithLayout;
