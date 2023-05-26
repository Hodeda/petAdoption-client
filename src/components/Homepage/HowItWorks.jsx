import React from 'react'
import { motion } from 'framer-motion';
import { Typography, Grid } from '@mui/material';

const HowItWorks = () => {
  return (
    <div className='HowItWorksContainer'>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Grid container className='HomePageHowItWorks' spacing={2} justifyContent='center'>
              <Grid item xs={12}>
                <Typography variant='h4' align='center' sx={{fontFamily:'Poppins'}}>How It Works</Typography>
              </Grid>
              <Grid item xs={12} md={4} className='HowItWorksStep'>
                <Typography variant='h6' align='center' sx={{fontFamily:'Poppins'}}>Step 1: Sign up</Typography>
                <div className='HowItWorksContent'>
                  <img src={process.env.PUBLIC_URL + '/images/signupcat.png'} className='HowItWorksPics' alt="" />
                  <Typography align='center' sx={{fontFamily:'Poppins'}}>Create an account to get started.</Typography>
                </div>
              </Grid>
              <Grid item xs={12} md={4} className='HowItWorksStep'>
                <Typography variant='h6' align='center' sx={{fontFamily:'Poppins'}}>Step 2: Pick a pet</Typography>
                <div className='HowItWorksContent'>
                  <img src={process.env.PUBLIC_URL + '/images/pickfluffy.png'} className='HowItWorksPics' alt="" />
                  <Typography align='center' sx={{fontFamily:'Poppins'}}>Browse our selection of furry friends.</Typography>
                </div>
              </Grid>
              <Grid item xs={12} md={4} className='HowItWorksStep'>
                <Typography variant='h6' align='center' sx={{fontFamily:'Poppins'}}>Step 3: Start your journey</Typography>
                <div className='HowItWorksContent'>
                  <img src={process.env.PUBLIC_URL + '/images/journey.png'} className='HowItWorksPics' alt="" />
                  <Typography align='center' sx={{fontFamily:'Poppins'}}>Take your new pet home and start your journey together!</Typography>
                </div>
              </Grid>
            </Grid>
          </motion.div>
    </div>
  )
}

export default HowItWorks
