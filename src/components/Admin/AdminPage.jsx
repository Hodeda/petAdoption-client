import React, { useState } from "react";
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PetsIcon from '@mui/icons-material/Pets';
import UserList from './UserList';
import AddIcon from '@mui/icons-material/Add';
import AddPetForm from "./AddPetForm";
import AdminPets from "./AdminPets";

const AdminPage = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleListItemClick = (event, index) => {
        event.preventDefault()
        setSelectedIndex(index);
      };

      const renderContent = () => {
        switch (selectedIndex) {
          case 0:
            return <UserList/>
          case 1:
            return <AdminPets/>
          case 2:
            return <AddPetForm/>
          default:
            return null;
        }
      };

  return (
    <div className='AdminPageContainer'>
        <div className='AdminPageContentContainer'>
          <div className="AdminPageContent-Left">
            <Box  sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                <List component="nav" aria-label="main mailbox folders">
                    <ListItemButton
                    selected={selectedIndex === 0}
                    onClick={(event) => handleListItemClick(event, 0)}
                    >
                    <ListItemIcon>
                        <AccountBoxIcon />
                    </ListItemIcon >
                    <ListItemText primary="Users" />
                    </ListItemButton>
                    <ListItemButton
                    selected={selectedIndex === 1}
                    onClick={(event) => handleListItemClick(event, 1)}
                    >
                    <ListItemIcon>
                        <PetsIcon />
                    </ListItemIcon>
                    <ListItemText primary="All Pets" />
                    </ListItemButton>
                    <ListItemButton
                    selected={selectedIndex === 2}
                    onClick={(event) => handleListItemClick(event, 2)}
                    >
                    <ListItemIcon>
                        <AddIcon />
                    </ListItemIcon >
                    <ListItemText primary="Add A Pet" />
                    </ListItemButton>
                </List>
                <Divider />
                </Box>
          </div>
                <div className="AdminPageContent-Right">
                {renderContent()}
                </div>
        </div>
    </div>
  )
}

export default AdminPage