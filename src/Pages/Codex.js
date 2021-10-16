import React, {useEffect, useState} from 'react'
import axios from "axios";
import {useDebouncedEffect} from "../effects/useDebouncedEffect";
import Pagination from "@mui/material/Pagination";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import ContentTable from "../components/ContentTable";

const CodexPage = () => {
  const [data, setData] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const headings = [
    'ID',
    'Icon',
    'Name',
    'Slot',
  ]

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePage = async (e) => {
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
      setPageCount(response.data.total_pages);
    });
  }

  const handlePageChange = (event, value) => {
    handlePage(value);
  };

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

  useDebouncedEffect(() => handlePage(1), [searchTerm], 250);

  return (
    <>
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
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <Pagination count={pageCount} onChange={handlePageChange} />
        </div>
        <ContentTable headings={headings} data={data}/>
      </div>
    </>
  )
}

export default CodexPage
