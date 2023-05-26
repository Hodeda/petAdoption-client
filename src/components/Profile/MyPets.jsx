import React, { useEffect, useState } from 'react';
import { Button, IconButton } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import axios from 'axios';
import AnimationPage from '../AnimationPage';
import Pet from '../Pets/Pet';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const MyPets = ({fromAdmin,userId, userFirstName}) => {
  const [savedPetsArray, setSavedPetsArray] = useState([]);
  const [petsArray, setPetsArray] = useState({});
  const [currentView, setCurrentView] = useState('savedpets');
  const [loadingOver, setLoadingOver] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUserPets = async () => {
      try {
        setLoadingOver(false);
        let response;
        if (userId) {
          const config = {
            headers: {
              userIdentifier: `${userId}`
            }
          };
          response = await axios.get(`http://localhost:8080/users/mypets`, config);
        } else {
          response = await axios.get(`http://localhost:8080/users/mypets`);
        }
        setSavedPetsArray(response.data.savedPets);
        setPetsArray({
          adoptedPets: response.data.adoptedPets,
          fosteredPets: response.data.fosteredPets
        });
        setLoadingOver(true);
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
    };
    getUserPets();
  }, []);
  

  return (
    <div className='MyPetsContainer'>
      {error && <h2 className='ErrorMessage'>{error}</h2>}
      <div className='MyPetsTop'>
        <Button onClick={()=>setCurrentView('mypets')} className='MyPetsBtn' variant='contained' sx={{ background: '#8187dc' }}>{userFirstName ? `${userFirstName}'s pets ` : 'My Pets'} </Button>
        <IconButton>
          <PetsIcon />
        </IconButton>
        <Button onClick={()=>setCurrentView('savedpets')} className='MyPetsBtn' variant='contained' sx={{ background: '#8187dc' }}>{userFirstName ? `${userFirstName}'s saved pets ` : 'My Saved Pets'} <SaveAsIcon /></Button>
      </div>
      <div className='MyPetsContent'>
        {!loadingOver ? (
          <Box sx={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', margin:'2% 0%' }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {currentView === 'mypets' && (
              <AnimationPage>
                <h2 className='MyPetsTitle'>{userFirstName ? `${userFirstName}'s pets ` : 'My Pets'}</h2>
                {petsArray.fosteredPets.length === 0 && petsArray.adoptedPets.length === 0 ? <p className='NoPets'>You currently do not own or foster any pets. </p> : 
                (<div className='SinglePetContainer'>
                  {!fromAdmin ? petsArray.fosteredPets.map((pet) => (
                    <Pet key={pet._id} pet={pet}/>
                  )) :
                  petsArray.fosteredPets.map((pet) => (
                    <div key={pet._id} className={fromAdmin ? 'SinglePetAdmin' : 'SinglePet'}><Pet fromAdmin={true} key={pet._id} pet={pet}/></div>
                  ))}
                  {!fromAdmin ? petsArray.adoptedPets.map((pet) => (
                    <Pet key={pet._id} pet={pet}/>
                  )) :
                  petsArray.adoptedPets.map((pet) => (
                    <div key={pet._id} className={fromAdmin ? 'SinglePetAdmin' : 'SinglePet'}><Pet fromAdmin={true} key={pet._id} pet={pet}/></div>
                  ))}
                </div>)}
              </AnimationPage>
            )}
            {currentView === 'savedpets' && (
              <AnimationPage>
                <div> 
                  <h2 className='MyPetsTitle'>{userFirstName ? `${userFirstName}'s saved pets ` : 'My Saved Pets'}</h2>
                    {savedPetsArray.length === 0 ? <p className='NoPets'>You do not have any saved pets yet.</p> 
                    :
                    <div className='SinglePetContainer'>
                   {!fromAdmin ? savedPetsArray.map((pet) => (
                      <div key={pet._id} className='SinglePet'><Pet key={pet._id} pet={pet}/></div>
                    ))
                  :
                  savedPetsArray.map((pet) => (
                    <div key={pet._id} className={fromAdmin ? 'SinglePetAdmin' : 'SinglePet'}><Pet fromAdmin={true} key={pet._id} pet={pet}/></div>
                  ))}
                    </div>}
                </div>
              </AnimationPage>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default MyPets;
