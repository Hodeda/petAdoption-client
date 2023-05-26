import React, { useContext, useEffect, useState } from 'react'
import { PetsContextInstance } from '../../context/PetsContext'
import axios from 'axios'
import Pet from '../Pets/Pet'
import AnimationPage from '../AnimationPage'

const SearchList = () => {
    const { isRequestSent, requestBody, setIsRequestSent } = useContext(PetsContextInstance);
    const [petsArray, setPetsArray] = useState([])

    useEffect(() => {
        if (!isRequestSent) {
          return;
        }
        const fetchPets = async () => {
          try {
            const response = await axios.get("http://localhost:8080/pets/advanced", {
              params: requestBody,
            });
            setPetsArray(response.data);
          } catch (error) {
            console.log(error);
          }
        };
        fetchPets();
        setIsRequestSent(false);
      }, [isRequestSent]);
      
    
  return (
    <div className='PetSearchPage' style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/gridicon.svg)`, backgroundSize:'contain' }}>
        {petsArray.map((pet)=>{
            if (requestBody.adoptionStatus === 'Adopted' && pet.adoptionStatus === 'Adopted') {
                return <AnimationPage key={pet._id}><Pet key={pet._id} pet={pet}/></AnimationPage>
            } else if (requestBody.adoptionStatus === 'Fostered' && pet.adoptionStatus === 'Fostered'){
              return <AnimationPage key={pet._id}><Pet key={pet._id} pet={pet}/></AnimationPage>
            }
            return <AnimationPage key={pet._id}><Pet key={pet._id} pet={pet}/></AnimationPage>
        })}
    </div>
  )
}

export default SearchList