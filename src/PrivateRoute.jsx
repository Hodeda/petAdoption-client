import React, { useContext } from 'react'
import {Navigate} from 'react-router-dom'
import { UserContextInstance } from './context/UserContext';

const PrivateRoute = ({children}) => {
  const {token, loading} = useContext(UserContextInstance)
  if (loading) return null; 
  return token ? children : <Navigate to="/" />;
};


export default PrivateRoute