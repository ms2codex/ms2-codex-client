import React from 'react';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


import { styled } from "@mui/material/styles";
import { makeStyles } from '@mui/styles'



const FilterDropdown = (props) => {

  const CustomSelect = styled(Select)(({ theme }) => ({
    fontSize: 15,
    color: "white",
    borderBottom: "1px solid #6e6e70",
    '& .MuiMenu-list': {
      backgroundColor: "red"
    },
    menuPaper: {
      backgroundColor: "red"
    }
  }));

  const useStyles = makeStyles((theme) => ({
    textField: {
      // backgroundColor: 'red',
      backgroundColor: '#2f2e30',
      textShadow: '2px 2px 3px #232123, 0 0 1em #232123, 0 0 0.5em #232123',
      color: 'white',
      marginTop: '3px',
      height: '25px',
      '& .MuiInputBase-input': {
        height: '25px',
      }
    },
    selectOptions: {
      '& .MuiList-root': {
        backgroundColor: '#2f2e30',
        color: 'white',
        textShadow: '2px 2px 3px #232123, 0 0 1em #232123, 0 0 0.5em #232123',
      },
      '& .MuiPaper-root': {
        marginTop: '-10px'
      },
    },
    menuItem: {
      fontSize: 12,
      paddingTop: "4px",
      paddingBottom: "4px",
      "&:hover, &:focus": {
        backgroundColor: "#4868cf",
      }
    }
  }));

  const styles = useStyles()

  return (

    <div className="setting-tab">
      <div style={{ verticalAlign: 'middle', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}><p>{props.label}</p></div>
      <div style={{ width: '70%' }}>
        <FormControl sx={{ width: '100%', height: '100%', justifyContent: 'center' }}>
          <InputLabel id="demo-simple-select-label"></InputLabel>
          <CustomSelect
            MenuProps={{ classes: { root: styles.selectOptions } }}
            className="selector"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={props.tab}
            onChange={props.onChange}
          >
            {props.options.map((tab) => {
              return <MenuItem value={tab} key={tab}
                classes={{ root: styles.menuItem }}
              >{tab}</MenuItem>
            })}
          </CustomSelect>
        </FormControl>
      </div>
    </div>
  )
}

export default FilterDropdown
