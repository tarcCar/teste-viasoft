import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import Layout from '../Layout';

interface RouteWithLayoutProps extends RouteProps{
}
// Se ainda tem o token no local storage então está logado,
// usei o localstorage em vez do redux do login por causa se o usuario recarregar a pagina
const isAuthenticate = () => localStorage.getItem('token');

const RouteWithLayout:React.FC<RouteWithLayoutProps> = (props) => {
  const { component, ...rest } = props;
  const Component = component as any;

  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <Layout>
          {isAuthenticate() ? (
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
