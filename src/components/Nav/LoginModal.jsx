import React, { useState, useContext } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress';

const LoginModal = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('')
    const [message, setMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const findUser = async (user) => {
        setErrorMessage('')
        try {
            setIsLoading(true)
            const res = await axios.post(`${process.env.REACT_APP_SERVER}/users/login`,user)
            return res.data
        } catch (error) {
            console.error(error.message);
            setErrorMessage(error.response.data.message)
            setIsLoading(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userCredentials = {
            userEmail: email,
            userPassword:password
        }
        const response = await findUser(userCredentials)
        if(response) {
            setIsLoading(false)
            setMessage('Successfully Logged in!')
            localStorage.setItem("token", response.token);
            setTimeout(() => {
                window.location.reload()
            }, 1000);
        }
      };


  return (
    <>
        <div className='SignUpContainer'>
            <div className='SignUpTop'>
                <h1 className='center'><span className='SignUpHeadline-black'>Welcome Back</span><span className='dot'>.</span></h1>
                <h2 className='SignUpHeadline'>Please sign in to your account.</h2>
            </div>
            <form onSubmit={handleSubmit}>
                <Box className="EmailPassContainer">
                    <TextField className='SignUpInput'
                        sx={{ borderRadius: '10px', marginBottom: '16px' }}
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        sx={{ borderRadius: '10px', marginBottom: '16px' }}
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                    />
                    <Button variant="contained" type="submit" sx={{  marginTop: '16px', background:'#8187dc'}} >
                        Log in
                    </Button>
                    {errorMessage && <span className='ErrorMessage'>{errorMessage}</span>}
                    {message && <span className='Success'>{message}</span>}
                    {isLoading && <Box sx={{ display: 'flex', marginTop: 2,padding: 0, justifyContent: 'center', alignItems: 'center' }}>
                        <CircularProgress />
                    </Box> }
                </Box>
            </form>
        </div>
    </>
  )
}

export default LoginModal