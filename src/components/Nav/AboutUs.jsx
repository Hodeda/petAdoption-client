import React from 'react'
import PetsIcon from '@mui/icons-material/Pets';
import AnimationPage from '../AnimationPage'

const AboutUs = () => {
  return (
    <AnimationPage>
        <div className='AboutUsPage'>
            <div className='AboutUsContainer'>
                <div className='AboutUsTop' >
                    <h1 className='AboutUsHeader'><span className='AboutUsIcon'><PetsIcon/></span >AdoptAPaw</h1>
                </div>
                <div className='AboutUsContent'>
                    Welcome to Adopt a Paw! We are a team of animal lovers who are passionate about connecting pets in need with loving homes. Our website is dedicated to helping animal shelters, rescues, and adoption agencies showcase their adoptable pets and find them forever families.

                    Our mission is to make the adoption process easier and more accessible for everyone. We understand that adopting a pet is a big decision, and we want to provide all the resources and information you need to make an informed choice.

                    At Adopt a Paw, we believe that every pet deserves a chance at a happy life. We work with partner organizations to rescue and rehome pets from all over the country, regardless of their breed, age, or health condition.

                    Thank you for considering adopting a pet from Adopt a Paw. By choosing to adopt, you are not only saving a life, but also gaining a loyal and loving companion. We hope our website will inspire you to open your heart and home to a pet in need.
                </div>
            </div>
            <div className='AboutUsPicture'>
            <img className='CloudImage1' src={process.env.PUBLIC_URL + '/images/cloud2.svg'} alt="" />
                <img className='CloudImage2' src={process.env.PUBLIC_URL + '/images/cloud4.svg'} alt="" />
                <img className='MainAboutUsPic' src={process.env.PUBLIC_URL + '/images/about-us-image.svg'} alt="" />
                <img className='CloudImage2' src={process.env.PUBLIC_URL + '/images/cloud.svg'} alt="" />
                <img className='CloudImage1' src={process.env.PUBLIC_URL + '/images/cloud3.svg'} alt="" />
            </div>

        </div>
    </AnimationPage>
  )
}

export default AboutUs