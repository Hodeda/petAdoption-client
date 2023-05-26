import React, { useEffect, useState } from 'react'
import axios from 'axios'
import User from './User';
import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

const UserList = () => {
    const token = localStorage.getItem('token');
    const [usersArray, setUsersArray] = useState([])
    const [isLoading, setIsLoading] = useState(false)

useEffect(() => {
  const getAllUsers = async () => {
    if(token) {
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${token}`}};
              
          setIsLoading(true)
          const response = await axios.get(`${process.env.REACT_APP_SERVER}/users`, config);
          setUsersArray(response.data)
          setIsLoading(false)
        } catch (error) {
          console.log(error);
        }
    }
  };

  getAllUsers();
}, []);


  return (
    <div className='UserListContainer'>
        {isLoading && <Box sx={{ display: 'flex', margin: 4,padding: 0, justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress />
        </Box> }
        {!isLoading && <h1 className='user-list-title'>Total Users : {usersArray.length}</h1>}
        {!isLoading && <div className='user-list'>
        {usersArray.map((user,index)=>{
            return <User key={user._id} user={user} number={index+1}/>
        })}
        </div>}
        

    </div>
  )
}

export default UserList