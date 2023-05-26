import React, {  useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';



const SignUpModal = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [errorMessage, setErrorMessage] = useState('')
    const [message, setMessage] = useState('')

    const postUser = async (newUser) => {
        try {
            const response = await axios.post('http://localhost:8080/users/signup',newUser)
            return response.data
        } catch (error) {
            console.error(error);
            setErrorMessage(error.response.data.message)
        }
    }
    const handleSubmit = async (e) => {
        setErrorMessage('')
        setMessage('')
        e.preventDefault();
        if(password!==confirmPassword) {
            setErrorMessage('Please check the field again, use an unsigned email and passwords must match!')
            return
        }
        try {
            const newUser = {
                userId: uuidv4(),
                userFirstName:firstName,
                userLastName:lastName,
                userEmail:email,
                userPassword:password,
                userPhone:phone
            }
            const response = await postUser(newUser)
            if(response) {
                setMessage('Successfully Logged in!')
                localStorage.setItem("token", response.token);
                setTimeout(() => {
                    window.location.reload()
                }, 1000);
            }

        } catch (error) {
            console.log(error);
            setErrorMessage(error)
        }
        
      };

  return (
    <>
        <div className='SignUpContainer'>
            <div className='SignUpTop'>
                <h2 className='SignUpHeadline'>START FOR FREE</h2>
                <h1 className='center'><span className='SignUpHeadline-black'>Create new account</span><span className='dot'>.</span></h1>
            </div>
            <form onSubmit={handleSubmit}>
                <Box className="UserContainer" sx={{ display: 'flex', flexDirection: 'row' }}>
                    <TextField
                        sx={{ borderRadius: '10px', marginBottom: '16px', marginRight: '16px' }}
                        label="First Name"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        sx={{ borderRadius: '10px', marginBottom: '16px' }}
                        label="Last Name"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                    />
                </Box>
                <Box className="EmailPassContainer">
                    <TextField className='SignUpInput'
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                    <TextField
                        label="Phone Number"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                    />
                    <Button variant="contained" type="submit" sx={{  background:'#8187dc'}} >
                        Sign Up
                    </Button>
                    {errorMessage && <span className='ErrorMessage'>{errorMessage}</span>}
                    {message && <span className='Success'>{message}</span>}
                </Box>
            </form>
        </div>
    </>
  )
}

export default SignUpModal