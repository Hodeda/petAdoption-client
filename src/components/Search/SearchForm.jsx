import React, { useContext, useEffect, useState } from 'react';
import { OutlinedInput, FormControlLabel, Switch, MenuItem, InputLabel, Select } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { PetsContextInstance } from '../../context/PetsContext';


const SearchForm = () => {
  const [advancedSearch, setAdvancedSearch] = useState(false);
  const [advancedBody, setAdvancedBody] = useState({
    name: '',
    height: '',
    weight: '',
    adoptionStatus: ''
  });
  const [selectedPetType, setSelectedPetType] = useState(null);
  const [selectedAdoptionStatus, setSelectedAdoptionStatus] = useState(null);
  const [showError, setShowError] = useState(false)
  const { setRequestBody, setIsRequestSent, requestBody } = useContext(PetsContextInstance)

  const clearAdvancedSearchFields = () => {
    setAdvancedBody({
      name: '',
      height: '',
      weight: '',
      adoptionStatus: ''
    });
  };

  const handleToggle = () => {
    if (advancedSearch) {
      clearAdvancedSearchFields();
    }
    setAdvancedSearch(!advancedSearch);
  };
  

  const handlePetTypeChange = (event, value) => {
    if (!value) {
      setSelectedPetType(null);
    } else {
      setSelectedPetType(value);
    }
  };

  const handleAdoptionStatusChange = (event,value) => {
    if (!value) {
      setSelectedAdoptionStatus(null);
    } else {
      setSelectedAdoptionStatus(value);
    }

  }

  const handleAdvancedFilterChange = (e) => {
    const { name, value } = e.target;
    setAdvancedBody((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  

  const handleSearch = (e) => {
    e.preventDefault();
    const newRequestBody = {...advancedBody, petType: selectedPetType, adoptionStatus: selectedAdoptionStatus};
    setRequestBody(newRequestBody);
    setIsRequestSent(true);
  };
  
  

  const petTypes = ['Dog','Cat']
  const adoptionStatuses = ['Adopted','Available', 'Fostered']

  return (
    <div className='SearchFormContainer' style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/cloudybackground.svg)` }}>
        <div className='SearchFormTop'>
            <h1 className='SearchHeader'>Let's find you a new friend<span className='dot'>.</span></h1>
            <Stack spacing={2}>
                <Autocomplete
                    freeSolo
                    id="free-solo-2-demo"
                    disableClearable
                    value={selectedPetType}
                    onInputChange={handlePetTypeChange}
                    options={petTypes.map((option) => option)}
                    renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Type of Pet"
                        InputProps={{
                        ...params.InputProps,
                        type: 'search',
                        }}
                    />
                    )}
                />
            </Stack>
            <FormControlLabel
              control={
                <Switch
                  checked={advancedSearch}
                  onChange={handleToggle}
                />
              }
              label="Advanced Search"
            />
            {advancedSearch && (
              <div className='SearchInputsContainer'>
                <OutlinedInput name='name' placeholder='Name' onChange={handleAdvancedFilterChange}/>
                <OutlinedInput name='height' placeholder='Height' onChange={handleAdvancedFilterChange}/>
                <OutlinedInput name='weight' placeholder='Weight' onChange={handleAdvancedFilterChange}/>
                <Autocomplete
                    
                    freeSolo
                    disableClearable
                    name='adoptionStatus'
                    value={selectedAdoptionStatus}
                    onInputChange={handleAdoptionStatusChange}
                    onChange={handleAdvancedFilterChange}
                    options={adoptionStatuses.map((option) => option)}
                    renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Adoption Status"
                        InputProps={{
                        ...params.InputProps,
                        type: 'search',
                        }}
                    />
                    )}
                />
              </div>
            )}
            <div className='SearchButtonContainer'>
              <Button sx={{}} className='SearchButton' variant='contained' onClick={(e)=>handleSearch(e)}>Search <SearchIcon/> </Button>
            </div>
        </div>
    </div>
  )
}

export default SearchForm
