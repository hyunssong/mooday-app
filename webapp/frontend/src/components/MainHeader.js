import {  useState, useContext, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/UserContext";



const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: "#E7C27D",
    },
    secondary: {
      // This is green.A700 as hex.
      main: "#11cb5f",
    },
  },
  typography: {
    fontFamily: ['"Montserrat"', "Open Sans"].join(","),
  },
  toolBar: {
    margin: "auto",
    width: "100%",
    maxWidth: 1184,
  },
});

const MainHeader = (props) => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [settings, setSettings] = useState(["Profile", "Logout"]);
  const { token, setToken, userId, setUserId } = useContext(UserContext);
  const pages = ["Post", "Track"];

  const history = useHistory();
  const navigateTo=(link)=>{
    history.push(link);
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);

  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
    //depending on whether there is a token
    if (token) {
      setSettings(["Profile", "Logout"]); //user is logged in
    } else {
      setSettings(["Sign Up", "Login"]);
    }
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
   const handleUserMenu = (e) => {

    switch(e.target.innerHTML.toLowerCase()){
      case "profile": navigateTo("/profile");break;
      case "logout": localStorage.removeItem('access_token');localStorage.removeItem('refresh_token');setToken(''); history.go(0); break;
      case "login":props.onSignIn(true);break;
      case "sign up": props.onSignUp(true);navigateTo("/signup");break;
    }
   };


  const handleCloseNavMenu = (event) => {
    setAnchorElNav(null);
    switch(event.target.innerText.toLowerCase()){
      case "post": navigateTo("/new");break;
      case "track": navigateTo("/mood");break;
      default: navigateTo("/home");break;
    }
  };



  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position="static"
        color="primary"
        sx={{ width: "100%", maxWidth: 1500, mx: "auto" }}
      >
        <Container>
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
              onClick={(e) => navigateTo("/home")}
            >
              MooDAY
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
              onClick={(e) => navigateTo("/home")}
            >
              MooDAY
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="User" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography
                      textAlign="center"
                      onClick={(e) => handleUserMenu(e)}
                    >
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};
export default MainHeader;
