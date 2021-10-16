import React, { useState, useEffect } from "react";
import axios from "axios";
import { alpha, styled, withStyles } from "@mui/material/styles";

import Pagination from "@mui/material/Pagination";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";

import { useDebouncedEffect } from "../effects/useDebouncedEffect";

export function CodexTable() {
  // Data that is loaded into the table
  const [data, setData] = useState([]);
  // What page we're on
  const [pageCount, setPageCount] = useState(0);
  // WIP: Filtering search results
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePageChange = (event, value) => {
    handlePage(value);
  };

  // To load the inital data
  useEffect(() => {
    axios("https://ms2db.bootando.com/api/items", {
      method: "GET",
      mode: "cors",
      headers: {
        //   'Access-Control-Allow-Origin': '*',
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
    }).then((response) => {
      setData(response.data.data);
      setPageCount(response.data.total_pages);
    });
  }, [setData, setPageCount]);

  // When searching, wait until the uder hasn't typed, then go to the 1st page of the search
  useDebouncedEffect(() => handlePage(1), [searchTerm], 250);

//#region Styling Components

  const TopRow = styled(TableRow)`
    background-color: #6e6e70;
    border-radius: 5px;
    color: white;
    text-shadow: 2px 2px 3px #232123, 0 0 1em #232123, 0 0 0.5em #232123;
    border-bottom: 1px solid #6e6e70;
  `;

  const MS2Row = styled(TableRow)`
    background-color: #444446;
    box-shadow: inset 0 0 30px #232123;
    border-radius: 5px;
    color: white;
    text-shadow: 2px 2px 3px #232123, 0 0 1em #232123, 0 0 0.5em #232123;
    border-bottom: 1px solid #6e6e70;
  `;

  const MS2Cell = styled(TableCell)(({ theme }) => ({
    fontSize: 15,
    color: "#FFFFFF",
    borderBottom: "1px solid #6e6e70",
  }));

  const TopCell = styled(TableCell)(({ theme }) => ({
    fontSize: 15,
    color: "#FFFFFF",
    borderBottom: "1px solid #444446",
    // padding:0
  }));

  // WIP: Unused until search is implemented
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    border: "1px solid #8d8d8d",
    alignSelf: "center",
    borderRadius: "5px",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      // paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
  }));

  //#endregion
  
  // Turn this into a const or something
  async function handlePage(e) {
    let url = `https://ms2db.bootando.com/api/items?page=${e}&name=${searchTerm}`;
    axios(url, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
    }).then((response) => {
      setData(response.data.data);
    });
  }


  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          paddingTop: "10px",
        }}
      >
        <div style={{ display: "flex" }}>
          <input
            type="text"
            placeholder="Search (disabled)"
            value={searchTerm}
            onChange={handleSearch}
          />
          <Pagination count={pageCount} onChange={handlePageChange} />
        </div>
        <TableContainer component={Paper} sx={{ width: "40%", margin: "20px" }}>
          <Table
            sx={{ background: "#ffc600" }}
            size="small"
            aria-label="simple table"
          >
            <TableHead>
              <TopRow>
                <TopCell
                  style={{ borderRight: "1px solid #444446" }}
                  align="left"
                >
                  ID
                </TopCell>
                <TopCell
                  style={{ borderRight: "1px solid #444446" }}
                  align="left"
                >
                  Icon
                </TopCell>
                <TopCell
                  style={{ borderRight: "1px solid #444446" }}
                  align="left"
                >
                  Name
                </TopCell>
                <TopCell
                  style={{ borderRight: "1px solid #444446" }}
                  align="left"
                >
                  Slot
                </TopCell>
              </TopRow>
            </TableHead>
            <TableBody>
              {data.map((item) => (
                <MS2Row key={item.item_id} sx={{ height: "6vh" }}>
                  <MS2Cell align="left">{item.item_id}</MS2Cell>
                  <MS2Cell align="left">
                    <div
                      style={{
                        borderRadius: "3px",
                        boxShadow: "inset 0 0 15px #232123",
                        display: "flex",
                        justifyContent: "center",
                        width: "fit-content",
                      }}
                    >
                      <img
                        style={{ maxHeight: "5vh", maxWidth: "5vh" }}
                        src={`https://ms2db.bootando.com${item.slot_icon}`}>
                      </img>
                    </div>
                  </MS2Cell>
                  <MS2Cell align="left">{item.name}</MS2Cell>
                  <MS2Cell align="left">{item.slot}</MS2Cell>
                </MS2Row>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
