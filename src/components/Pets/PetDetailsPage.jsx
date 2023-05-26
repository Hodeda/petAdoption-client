import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Button,
  Box,
} from '@mui/material';
import { UserContextInstance } from '../../context/UserContext';


const PetDetailsPage = () => {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const {userDetails, token, updateUserDetails , setUserDetailsChanged, userDetailsChanged} = useContext(UserContextInstance)
  const [error, setError] = useState(null)
  const [showError, setShowError] = useState(false)
  const [petSaved, setPetSaved] = useState(false)
  const [petFostered, setPetFostered] = useState(false)
  const [isPetAdopted, setIsPetAdopted] = useState(false)
  const [petAdoptionStatus, setPetAdoptionStatus] = useState('');

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/pets/${id}`);
        setPet(response.data);
        setPetAdoptionStatus(response.data.adoptionStatus);
      } catch (error) {
        console.log(error);
        setError('Error loading pet');
      }
    };
    fetchPet();
  }, [id,userDetailsChanged]);

  useEffect(() => {
    if (userDetails) {
      if (userDetails.savedPets.includes(id)) {
        setPetSaved(true);
      } else {
        setPetSaved(false);
      }
      if(userDetails.fosteredPets.includes(id)) {
          setPetFostered(true);
      }
      if(userDetails.adoptedPets.includes(id)) {
        setIsPetAdopted(true)
        setPetFostered(true)
      }
      if (pet) {
        if(userDetails._id === pet.adoptedBy) {
            setPetFostered(true)
        }
      }
    
  }}, [userDetails, id, userDetailsChanged]);

  const checkIsLoggedIn = () => {
    setShowError(false)
    setError('')
    if ( userDetails === null) {
        setError(`You must log in first before performing an action.`)
        setShowError(true)
        return false
    }
    return true;
  }
  
  const handleReturn = async () => {
    const res = checkIsLoggedIn()
    if(!res) return
    try {
        const updatedDetails = {petId:id, userId:userDetails._id, token}
        await axios.put(`http://localhost:8080/pets/${id}/return`, updatedDetails)
        setIsPetAdopted(false)
        setPetFostered(false)
        setPetAdoptionStatus('Available');
        setUserDetailsChanged(true)
    } catch (error) {
        console.log(error)
        setError('Error returning pet')
        setShowError(true)
    };  
  };
  

  const updatePetStatus = async (e) => {
    e.preventDefault()
    const res = checkIsLoggedIn()
    if(!res) return
    const status = e.target.innerText.toLowerCase()
    try {
        const updatedDetails = {petId:id, userId:userDetails._id, token, status}
        await axios.put(`http://localhost:8080/pets/${id}/adopt`, updatedDetails)
        if(status === 'adopt') {
            setIsPetAdopted(true)
            setPetFostered(true)
            setPetAdoptionStatus('Adopted');
            setUserDetailsChanged(true)
        } else if (status === 'foster') {
            setPetFostered(true)
            setPetAdoptionStatus('Fostered');
            setUserDetailsChanged(true)
        }
    } catch (error) {
        console.log(error)
        setError('Error adopting pet')
        setShowError(true)
    };
  };

  const handleSave = async (e) => {
    e.preventDefault()
    const res = checkIsLoggedIn()
    if(!res) return
    setPetSaved(true)
    try {
        const updatedDetails = {petId:id, userId: userDetails._id, token}
        const response = await axios.put(`http://localhost:8080/pets/${id}/save`, updatedDetails)
        if(response.data.isSaved===true) {
            setPetSaved(true)
            updateUserDetails(response.data.updatedUser)
            console.log('inside');
            setUserDetailsChanged(true)
          }
          setUserDetailsChanged(true)
    }
     catch (error) {
        console.log(error)
        setError('Error saving pet')
        setShowError(true)
        setPetSaved(false)
    }
  };

  const handleUnsave = async (e) => { 
    e.preventDefault()
    const res = checkIsLoggedIn()
    if(!res) return
    setPetSaved(false)
    try {
        const updatedDetails = {petId:id, userId:userDetails._id, token}
        const response = await axios.put(`http://localhost:8080/pets/${id}/unsave`, updatedDetails)
        if(response.data.isSaved===false) {
            setPetSaved(false)
            updateUserDetails(response.data.updatedUser)
            setUserDetailsChanged(true)
        }
        setUserDetailsChanged(true)
    }
     catch (error) {
        console.log(error)
        setError('Error unsaving pet')
        setShowError(true)
    }
  };

  return (
    <div>
      {pet && (
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={8} md={6}>
            <Card sx={{marginTop:4}}>
                <Typography gutterBottom variant="h4" component="div" sx={{fontFamily:'Poppins', fontWeight:700,textAlign:'center'}}>
                  {pet.name}
                </Typography>
              <CardMedia
                component="img"
                height="400"
                image={pet.picture}
                sx={{ objectFit: 'contain',borderRadius:'50%' }}
              />
              <CardContent>
                <div className='PetDetailsContainer' >
                    <div className='ProfileLabelsContainer'><span className='PetLabels'>Type:</span> <span className='ProfileLabels-res'>{pet.type}</span> </div>
                    <div className='ProfileLabelsContainer'><span className='PetLabels'>Breed: </span><span className='ProfileLabels-res'>{pet.breed}</span></div>
                    <div className='ProfileLabelsContainer'><span className='PetLabels'>Adoption Status: </span ><span className='ProfileLabels-res'>{petAdoptionStatus}</span></div>
                    <div className='ProfileLabelsContainer'><span className='PetLabels'>Height: </span><span className='ProfileLabels-res'>{pet.height}</span></div>
                    <div className='ProfileLabelsContainer'><span className='PetLabels'>Weight: </span><span className='ProfileLabels-res'>{pet.weight}</span></div>
                    <div className='ProfileLabelsContainer'><span className='PetLabels'>Color: </span><span className='ProfileLabels-res'>{pet.color}</span></div>
                    <div className='ProfileLabelsContainer'><span className='PetLabels'>Bio: </span><span className='ProfileLabels-res'>{pet.bio}</span></div>
                    <div className='ProfileLabelsContainer'><span className='PetLabels'>Hypoallergenic: </span><span className='ProfileLabels-res'>{pet.hypoallergenic ? 'Yes' : 'No'}</span></div>
                    <div className='ProfileLabelsContainer'><span className='PetLabels'>Dietary Restrictions: </span><span className='ProfileLabels-res'>{pet.dietaryRestrictions}</span></div> 
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
{ pet && <Box mt={2} pb={3} display="flex" justifyContent="center">
        {petAdoptionStatus !== 'Adopted' && (
            <Button
            variant="contained"
            onClick={(e) => updatePetStatus(e)}
            sx={{ backgroundColor: '#E9BC52', '&:hover': { backgroundColor: '#F4D588' } }}
            >
            Adopt
            </Button>
        )}
  <Box mx={1} />
    {(petAdoptionStatus === 'Fostered' || petAdoptionStatus === 'Adopted') &&
        (petFostered || isPetAdopted) ? (
        <Button
            variant="contained"
            color="secondary"
            onClick={handleReturn}
            sx={{ backgroundColor: '#DAB6FC', '&:hover': { backgroundColor: '#AE8AFF' } }}
        >
            Return
        </Button>
        ) : (
        petAdoptionStatus === 'Available' && (
            <Button
            variant="contained"
            color="secondary"
            onClick={(e) => updatePetStatus(e)}
            sx={{ backgroundColor: '#DAB6FC', '&:hover': { backgroundColor: '#AE8AFF' } }}
            >
            Foster
            </Button>
        )
        )}
  <Box mx={1} />
  <Box mx={1} />
        {petSaved ? (
            <Button variant="contained" onClick={(e) => handleUnsave(e)}>
            Unsave
            </Button>
        ) : (
            <Button variant="contained" onClick={(e) => handleSave(e)}>
            Save for Later
            </Button>
        )}
</Box>}
      {showError && <div className='ErrorMessage'>{error}</div>}
    </div>
  );
};

export default PetDetailsPage;
