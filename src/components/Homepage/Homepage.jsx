import React from 'react'
import HomePageHeader from './HomePageHeader';
import HowItWorks from './HowItWorks';
import AnimationPage from '../AnimationPage'



const Homepage = () => {
  return (
    <div>
      <AnimationPage>
        <HomePageHeader/>
        <HowItWorks/>
      </AnimationPage>
    </div>
  )
}

export default Homepage