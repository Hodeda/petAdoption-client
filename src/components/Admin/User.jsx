import React, { useState } from 'react';
import Button from '@mui/material/Button';
import UserDetailsModal from './UserDetailsModal';

const User = ({user, number}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className='UserDetailsContainer' style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/circles.svg)`, backgroundSize:'cover' }}>
      <h3 className='UserTitle'>User Number #{number}</h3>
      <div className='UserDetails'>
        <span className='UserDetail'> {user.userFirstName}</span>
        <span className='UserDetail'> {user.userLastName}</span>
      </div>
      <Button onClick={handleOpen}>View Details</Button>
      <UserDetailsModal open={open} handleClose={handleClose} user={user} />
    </div>
  )
}

export default User;
