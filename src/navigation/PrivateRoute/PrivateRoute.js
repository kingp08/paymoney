import React from 'react';
import {useSelector} from 'react-redux';
import SignIn from '../../authentication/signin/SignIn';

const PrivateRoute = ({children}) => {
  const {user} = useSelector(state => state.loginUserReducer);
  const {token} = user || {};
  if (!token) {
    return <SignIn {...children.props} />;
  }
  return children;
};

export default PrivateRoute;
