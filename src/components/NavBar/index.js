import React from 'react'
import {AppBar, Toolbar} from "@mui/material";

const NavBar = () => {
  return (
    <AppBar style={{position: "sticky"}} sx={{background: 'orange'}}>
      <Toolbar variant="dense" sx={{display: 'flex', justifyContent: 'center'}}>
        <a href="/"><img src={require('../../../public/pictures/site_logo.png')}></img></a>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
