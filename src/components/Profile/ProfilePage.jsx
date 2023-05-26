import React, { useContext, useEffect, useState } from "react";
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PetsIcon from '@mui/icons-material/Pets';
import AnimationPage from '../AnimationPage'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ProfileForm from "./ProfileForm";
import MyPets from "./MyPets";
import { UserContextInstance } from "../../context/UserContext";

const ProfilePage = () => {
  const {userDetails} = useContext(UserContextInstance)
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false)

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const renderContent = () => {
    switch (selectedIndex) {
      case 0:
        return <ProfileForm/>;
      case 1:
        return <MyPets/>;
      default:
        return null;
    }
  };

  useEffect(()=>{
    if(userDetails) {
      if(userDetails.isAdmin) setIsAdmin(true)
    }

  },[userDetails])

  return (
    <AnimationPage>
        <div className="ProfilePageContainer">
          <div className="ProfilePageDetails">
            <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', '@media screen and (max-width: 768px)': { width:'40%' } }}>
              <List component="nav" aria-label="main mailbox folders">
                <ListItemButton
                  selected={selectedIndex === 0}
                  onClick={(event) => handleListItemClick(event, 0)}
                >
                  <ListItemIcon>
                    <AccountBoxIcon />
                  </ListItemIcon >
                  <ListItemText primary="My Profile" />
                </ListItemButton>
                <ListItemButton
                  selected={selectedIndex === 1}
                  onClick={(event) => handleListItemClick(event, 1)}
                >
                  <ListItemIcon>
                    <PetsIcon />
                  </ListItemIcon>
                  <ListItemText primary="My Pets" />
                </ListItemButton>
              </List>
              <Divider />
              {isAdmin && <List component="nav" aria-label="secondary mailbox folder">
                <ListItemButton href="/admin"
                  selected={selectedIndex === 3}
                  onClick={(event) => handleListItemClick(event, 3)}
                >
                  <ListItemIcon>
                    <AdminPanelSettingsIcon/>
                  </ListItemIcon>
                  <ListItemText primary="Admin Dashboard" />
                </ListItemButton>
              </List>}
            </Box>
            <div className="ProfilePageDetails-Right">
              {renderContent()}
            </div>
          </div>
        </div>
    </AnimationPage>
  );
};

export default ProfilePage;
