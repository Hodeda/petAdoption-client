import React, {useContext, useEffect} from 'react'
import ChromeReaderModeIcon from '@mui/icons-material/ChromeReaderMode';
import PetsIcon from '@mui/icons-material/Pets';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material'
import { UserContextInstance } from '../../context/UserContext';

const HomePageHeader = () => {
  const { userDetails } = useContext(UserContextInstance)


  return (
    <div className='HomePageTop'>
        <div>
          <img className='CatPic' src={process.env.PUBLIC_URL + '/images/Cat.svg'} alt="cute kitty" />
        </div>
          <div className='HomePageDetails'>
            {userDetails ? <h1 className='HomePageHeader1'><span className='HomePageHeader'>Welcome Back </span><span className='HomePageHeader'>{userDetails.userFirstName} {userDetails.userLastName}</span><span className='HomePageHeader-purple'>. </span></h1>
            :
            <h1 className='HomePageHeader1'><span className='HomePageHeader'>Looking for a </span><span className='HomePageHeader-purple'>good </span><span className='HomePageHeader'>time?</span></h1>}
              <h3 className='HomePageHeader-desc'>Find your new best friend and create unforgettable memories with a furry companion from our adoption center.</h3>
              <div className='HomePageButtons'>
                  <Link to={'/about-us'}><Button className='HomePageBtn' variant='contained' sx={{background:'#8187dc'}}>Read More <ChromeReaderModeIcon /></Button></Link>
                  <Link to={'/search'}><Button className='HomePageBtn' variant='contained' sx={{background:'#8187dc'}}>Adopt Now <PetsIcon/></Button></Link>
              </div>
              <div>
                <img className='DogOnCouchPic' src={process.env.PUBLIC_URL + '/images/dogcouch.png'} alt="dog on a couch" />
              </div>
          </div>
          <div>
              <img className='DogPic' src={process.env.PUBLIC_URL + '/images/Dog.svg'} alt="cute doggy" />
          </div>
    </div>
  )
}

export default HomePageHeader