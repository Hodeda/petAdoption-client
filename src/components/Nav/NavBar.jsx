import React, { useContext, useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import PetsIcon from '@mui/icons-material/Pets';
import UserModal from './UserModal';
import { Link } from 'react-router-dom';
import { UserContextInstance } from '../../context/UserContext';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';




const NavBar = () => {
  const [open, setOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const {token,setToken} = useContext(UserContextInstance);


  const pages = token ? ['Profile', 'About us','Search'] : ['About us', 'Search']


  const handleLogOut = (e) => {
    e.preventDefault()
    localStorage.removeItem("token");
    setToken('')
    window.location.reload();
  }

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };
  
  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };
  

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <AppBar position="static" sx={{ background:'white'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <PetsIcon sx={{ display: { xs: 'flex', md: 'flex', color:'#8187DC' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', sm: 'flex', md: 'flex' },
              fontFamily: 'Dosis',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'black',
              textDecoration: 'none',
            }}
          >
            AdoptAPaw
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex', md: 'flex' } }}>
            {pages.map((page) => (
                <Link key={page} className='nav-link' to={`/${page.toLowerCase().replace(/\s/g, '-')}`}>
                    <Button
                        key={page}
                        sx={{ my: 2, color: 'black', display: 'block', fontFamily: 'Poppins' }}
                        className='NavLink'
                    >
                        {page}
                    </Button>
              </Link>
            ))}
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'none', md: 'none' }, justifyContent:'flex-end' }}>
            <IconButton onClick={handleDrawerOpen} sx={{ color:'#8187DC' }}>
              <MenuIcon/>
            </IconButton>
          </Box>
          <Box sx={{ flexGrow: 0, display: { xs: 'flex', sm: 'flex', md: 'flex' } }}>
            {token ? <Button
              onClick={(e) => handleLogOut(e)}
              sx={{ my: 2, color: 'black', display: 'block', fontFamily: 'Dosis' }}
            >
              Log Out
            </Button>   : <Button
              onClick={() => handleOpen()}
              sx={{ my: 2, color: 'black', display: 'block', fontFamily: 'Dosis' }}
            >
              Log in
            </Button> }
          </Box>
        </Toolbar>
      </Container>
      <UserModal open={open} handleClose={handleClose} />
      <Drawer anchor="bottom" open={drawerOpen} onClose={handleDrawerClose}>
        <List>
          {pages.map((page) => (
            <ListItem key={page} onClick={handleDrawerClose} component={Link} to={`/${page.toLowerCase().replace(/\s/g, '-')}`}>
              <Typography sx={{ fontFamily: 'Poppins' }} variant="body1">{page}</Typography>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </AppBar>
  );
}

export default NavBar;
