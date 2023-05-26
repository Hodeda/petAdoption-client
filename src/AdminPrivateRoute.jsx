import React, { useContext } from 'react'
import {Navigate} from 'react-router-dom'
import { UserContextInstance } from './context/UserContext';
import { CircularProgress, Box } from '@mui/material';



const AdminPrivateRoute = ({children}) => {
    const {isAdmin, loadingAdmin} = useContext(UserContextInstance)
    if(loadingAdmin) return <Box sx={{ display: 'flex', margin: 4,padding: 0, justifyContent: 'center', alignItems: 'center' }}>
    <CircularProgress />
  </Box> 
    
  return isAdmin ? children : <h1 className='ErrorMessage'>No Access</h1>;
}

export default AdminPrivateRoute