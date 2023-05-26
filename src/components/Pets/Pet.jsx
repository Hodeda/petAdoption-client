import React from 'react'
import { Link } from 'react-router-dom'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const Pet = ({fromAdmin,pet, editMode}) => {
  
  return (
    <Link to={editMode ? `/pets/${pet._id}/edit` : `/pets/${pet._id}`} className="PetLink">
       <Card sx={{ width: fromAdmin ? 50 : 250, height:fromAdmin ? 50 : 350, margin:'2%', '@media screen and (max-width: 768px)': { width: '80%'}}}>
      <CardMedia
        sx={{margin: 0, width:fromAdmin ? 50 : 250,height:fromAdmin ? 50 : 250 }}
        image={pet.picture ? `${pet.picture}` : "defaultImage.jpg"}
        title="pet"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {pet.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Pet type: {pet.type}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Pet Breed: {pet.breed}
        </Typography>
      </CardContent>
    </Card>
    </Link>
  )
}

export default Pet