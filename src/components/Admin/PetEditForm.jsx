import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import AddPetForm from './AddPetForm'

const PetEditForm = () => {
    const [form, setForm] = useState('')
    const [pet, setPet] = useState({})
    const [error, setError] = useState('')
    const [isEditMode, setIsEditMode] = useState(false)
    const {id} = useParams()
    
    useEffect(() => {
        const fetchPet = async () => {
          try {
            const response = await axios.get(`http://localhost:8080/pets/${id}`);
            setPet(response.data);
            setIsEditMode(true)
          } catch (error) {
            console.log(error);
            setError('Error loading pet');
          }
        };
        fetchPet();
      }, [id]);
    
  return (
    <div>
        {isEditMode && <AddPetForm editMode={true} pet={pet}/>}
    </div>
  )
}

export default PetEditForm