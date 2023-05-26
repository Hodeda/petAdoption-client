import { Box, TextField, Button, Modal } from '@mui/material';
import axios from 'axios';
import React, { useContext, useState } from 'react'
import { UserContextInstance } from '../../context/UserContext';

const PassChangeModal = ({ open, handleClose }) => {
    const [currPassword, setCurrPassword] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [message, setMessage] = useState("");
    const {token, userDetails} = useContext(UserContextInstance)

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 650,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

      const handleSubmit = async (e)=>{
        e.preventDefault()
        setErrorMessage('')
        setMessage('')
        if(password !== confirmPassword){
            setErrorMessage('Passwords do not match')
            return
        }
        const passObj = {
            currPassword,
            password,
            token,
            userId:userDetails._id
        }
        try {
            const response = await axios.post('http://localhost:8080/users/passchange', passObj)
            setMessage(response.data.message)
            setTimeout(() => {
                window.location.reload();
            }, 700);
        } catch (error) {
            console.log(error);
            setErrorMessage(error.response.data.message)
            return   
        }
    }
    
  return (
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
            <form onSubmit={handleSubmit}>
                <Box sx={style} className="EmailPassContainer">
                    <h1 className='ProfileCard-header '>Change your password<span className='dot'>.</span></h1>
                    <TextField className='SignUpInput'
                        label="Current Password"
                        type="password"
                        value={currPassword}
                        onChange={(e) => setCurrPassword(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Confirm Password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                    />
                    <Button variant="contained" type="submit" sx={{  background:'#8187dc'}} >
                        Change Password
                    </Button>
                    {errorMessage && <span className='ErrorMessage'>{errorMessage}</span>}
                    {message && <span className='Success'>{message}</span>}
                </Box>
            </form>
    </Modal>
  )
}

export default PassChangeModal