import React, { useEffect, useState } from 'react'
import axios from 'axios'
import User from './User';

const UserList = () => {
    const token = localStorage.getItem('token');
    const [usersArray, setUsersArray] = useState([])

useEffect(() => {
  const getAllUsers = async () => {
    if(token) {
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${token}`}};
    
          const response = await axios.get(`${process.env.REACT_APP_SERVER}/users`, config);
          setUsersArray(response.data)
        } catch (error) {
          console.log(error);
        }
    }
  };

  getAllUsers();
}, []);


  return (
    <div className='UserListContainer'>
        <h1 className='user-list-title'>Total Users : {usersArray.length}</h1>
        <div className='user-list'>
        {usersArray.map((user,index)=>{
            return <User key={user._id} user={user} number={index+1}/>
        })}
        </div>
        

    </div>
  )
}

export default UserList