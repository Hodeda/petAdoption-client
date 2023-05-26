import { Box, Divider } from '@mui/material'
import React from 'react'
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import MyPets from '../Profile/MyPets';



const UserDetailsModal = ({open,handleClose, user}) => {

  return (
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ 
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 500,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            '@media (max-width: 768px)': {
              width:'100%'
          }}}
        >
          <Typography id="modal-modal-title" variant="h4" component="h2" sx={{ fontFamily:'Poppins', textAlign:'center', borderBottom:'1px solid #000'}}>
            User Details<span className='dot'>.</span>
          </Typography>
          <Typography id="modal-modal-description" sx={{ fontFamily:'Poppins', mt: 2,mb:2 }}>
            First name: {user.userFirstName} <br/>
            Last name: {user.userLastName} <br/>
            Email : {user.userEmail} <br/>
            Phone : {user.userPhone} <br/>
            {user.bio ? <>Bio : {user.bio}</> : null }<br/>
          </Typography>
          <Divider/>
          <Box>
            <MyPets fromAdmin={true} userId={user._id} userFirstName={user.userFirstName}/>
          </Box>
        </Box>
      </Modal>
  )
}

export default UserDetailsModal