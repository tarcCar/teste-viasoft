import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import Layout from '../Layout';

interface RouteWithLayoutProps extends RouteProps{
}
const RouteWithLayout:React.FC<RouteWithLayoutProps> = (props) => {
  const { component, ...rest } = props;
  const Component = component as any;
  const usuarioLogado = true;
  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <Layout>
          {usuarioLogado ? (
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
