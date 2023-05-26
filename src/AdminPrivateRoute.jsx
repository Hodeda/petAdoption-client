import React, { useContext } from 'react'
import { UserContextInstance } from './context/UserContext';
import { CircularProgress, Box } from '@mui/material';

const AdminPrivateRoute = ({children}) => {
    const {isAdmin, loadingAdmin, userDetails} = useContext(UserContextInstance)

    if(loadingAdmin) return (
        <Box sx={{ display: 'flex', margin: 4,padding: 0, justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress />
        </Box> 
    )
    if (!userDetails) {
        return <Box sx={{ display: 'flex', margin: 4,padding: 0, justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
    </Box> 
    }
    if( !loadingAdmin && isAdmin) {
        return children
    }
    if(!isAdmin) {
        return <h1 className='ErrorMessage'>No Access</h1>
    } 
}

export default AdminPrivateRoute
