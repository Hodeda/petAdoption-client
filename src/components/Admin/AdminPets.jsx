import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AnimationPage from '../AnimationPage';
import Pet from '../Pets/Pet';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const AdminPets = () => {
    const [petsArray, setPetsArray] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchPets = async () => {
          try {
            setIsLoading(true)
            const response = await axios.get(`${process.env.REACT_APP_SERVER}/pets`);
            setPetsArray(response.data);
            setIsLoading(false)
          } catch (error) {
            console.log(error);
          }
        };
        fetchPets();
      }, []);
      
    
  return (
    <div style={{width:'100%', height:'100%' ,justifyContent:'center',alignItems:'center',display:'flex'}}>
        {isLoading ? 
            <Box sx={{ display: 'flex', margin: 0,padding: 0, justifyContent: 'center', alignItems: 'center' }}>
             <CircularProgress />
            </Box> 
        :  
        <div className='PetSearchPage' style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/gridicon.svg)`, backgroundSize:'contain' }}>
            {petsArray.map((pet)=>{
                return <AnimationPage key={pet._id}><Pet editMode={true} key={pet._id} pet={pet}/></AnimationPage>
            })}
        </div>}
    </div>
  )
}

export default AdminPets