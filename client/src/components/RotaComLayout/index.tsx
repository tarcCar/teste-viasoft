import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { RootState } from '../../store/reducers';
import Layout from '../Layout';

interface RouteWithLayoutProps extends RouteProps{
}
const RouteWithLayout:React.FC<RouteWithLayoutProps> = (props) => {
  const { component, ...rest } = props;
  const Component = component as any;
  const loginSucesso = useSelector((state:RootState) => state.loginReducer.loginSucesso);
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
