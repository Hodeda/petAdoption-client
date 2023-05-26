import React, { useState } from 'react';
import { TextField, Select, MenuItem, FormControl, InputLabel, Button, Switch, FormControlLabel, CircularProgress, Box, OutlinedInput } from '@mui/material';
import axios from 'axios'

const AddPetForm = ({editMode, pet}) => {
  const [form, setForm] = useState({
    petId: editMode ? pet._id : '',
    type: editMode ? pet.type : '',
    name: editMode ? pet.name : '',
    adoptionStatus: editMode ? pet.adoptionStatus : '',
    picture: editMode ? pet.picture : null,
    height: editMode ? pet.height : '',
    weight: editMode ? pet.weight : '',
    color: editMode ? pet.color : '',
    bio: editMode ? pet.bio : '',
    hypoallergnic: editMode ? pet.hypoallergnic : false,
    dietaryRestrictions: editMode ? pet.dietary : '',
    breed: editMode ? pet.breed : '',
  });

  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handlePictureChange = (event) => {
    setForm({
      ...form,
      picture: event.target.files[0],
    });
  };

  const handleSwitchChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.checked,
    });
  };

  const createFormData = () => {
    const formData = new FormData()
    Object.keys(form).forEach(key => {
      formData.append(key, form[key])
    });
    return formData
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('')
    setMessage('')
    if (!form.picture) {
      setError('Please upload a picture.');
      return;
    }
    try {
      setIsLoading(true)
      const formData = createFormData()
      const response = await axios.post('http://localhost:8080/pets/addpet', formData)
      if (response.data.status) {
        setMessage(response.data.message)
        setIsLoading(false)
      }
    } catch (error) {
      console.log(error);
      setError(error)
      setIsLoading(false)
    }
  };

  const handlePetChange = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')
    if (!form.picture) {
      setError('Please upload a picture.');
      return;
    }
    try {
      setIsLoading(true)
      const formData = createFormData()
      const response = await axios.put('http://localhost:8080/pets/editpet', formData)
      console.log(response.data);
      if (response.data.status) {
        setMessage(response.data.message)
        setIsLoading(false)
      }
    } catch (error) {
      console.log(error);
      setError(error)
      setIsLoading(false)
    }
  }

  return (
    <div className='AddPetForm'>
      <h1>{pet ? `Edit ${pet.name}` : 'Add A Pet'}</h1>
      <span>{pet ? 'Fill in the fields below to edit this pet.' : 'fill all the fields below to add a new pet to the shelter'}</span>
      <form className='FormContainer' onSubmit={editMode ? handlePetChange : handleSubmit}>
      {isLoading && <Box sx={{ display: 'flex', margin: 0,padding: 0, justifyContent: 'center', alignItems: 'center' }}>
             <CircularProgress />
            </Box> }
      {error && <p className='ErrorMessage'>{error}</p>}
      {message && <p className='Success'>{message}</p>}
          <FormControl sx={{ margin:'1% 0%'}} fullWidth>
            <InputLabel>Type</InputLabel>
            <Select required name="type" value={form.type} onChange={handleInputChange}>
              <MenuItem value={'Dog'}>Dog</MenuItem>
              <MenuItem value={'Cat'}>Cat</MenuItem>
            </Select>
          </FormControl>
        <TextField required sx={{ margin:'1% 0%'}} name="name" label="Name" value={form.name} onChange={handleInputChange} fullWidth/>
          <FormControl variant="outlined" sx={{ margin:'1% 0%'}}  fullWidth>
          <InputLabel>Status</InputLabel>
          <Select required name="adoptionStatus" value={form.adoptionStatus} onChange={handleInputChange}>
            <MenuItem value={'Available'}>Available</MenuItem>
            <MenuItem value={'Adopted'}>Adopted</MenuItem>
            <MenuItem value={'Fostered'}>Fostered</MenuItem>
          </Select>
        </FormControl>
        <Button sx={{ margin:'1% 0%'}} variant="contained" component="label" fullWidth>
          {editMode ? 'Change Picture' : 'Upload Picture'}
          <input name="picture" type="file" hidden onChange={handlePictureChange} />
        </Button>
        <TextField required type='number' sx={{ margin:'1% 0%'}} name="height" label="Height" value={form.height} onChange={handleInputChange} fullWidth/>
        <TextField required type='number' sx={{ margin:'1% 0%'}} name="weight" label="Weight" value={form.weight} onChange={handleInputChange} fullWidth/>
        <TextField required sx={{ margin:'1% 0%'}} name="color" label="Color" value={form.color} onChange={handleInputChange} fullWidth/>
        <TextField sx={{ margin:'1% 0%'}} name="bio" label="Bio" value={form.bio} onChange={handleInputChange} fullWidth/>
        {editMode ? <FormControlLabel
          control={<Switch name="hypoallergnic" checked={form.hypoallergnic} onChange={handleSwitchChange} />}
          label="Hypoallergnic"
        /> 
        :<FormControlLabel
          control={<Switch name="hypoallergnic" checked={form.hypoallergnic} onChange={handleSwitchChange} />}
          label="Hypoallergnic"
        />}
        <TextField sx={{ margin:'1% 0%'}} name="dietaryRestrictions" label="Dietary Restrictions" value={pet ? pet.dietary : form.dietaryRestrictions} onChange={handleInputChange} fullWidth/>
        <TextField required sx={{ margin:'1% 0%'}} name="breed" label="Breed" value={form.breed} onChange={handleInputChange} fullWidth/>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          {pet ? 'Edit Pet':'Add Pet'}
        </Button>
      </form>
    </div>
  );
};

export default AddPetForm;
