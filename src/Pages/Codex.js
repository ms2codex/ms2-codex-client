import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import { useDebouncedEffect } from "../effects/useDebouncedEffect";
import Pagination from "@mui/material/Pagination";
import ContentTable from "../components/ContentTable";


import FilterContainer from '../containers/Filters/FilterContainer'


import { useHistory } from "react-router-dom"


const CodexPage = (props) => {
  let history = useHistory();
  let { page } = useParams();
  const [data, setData] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchId, setSearchId] = useState(0);
  const [tab, setTab] = useState("");
  const [filteredJob, setJob] = useState("-")
  const [slot, setSlot] = useState("-")
  const [pasted, setPasted] = useState(false);

  // headings for table
  const headings = [
    'ID',
    'Icon',
    'Name',
    'Slot',
  ]

  // first load
  const didMountPage = useRef(false);
  // effect for handling what shows up in the table
  useEffect(() => {
    // after the first render
    if (didMountPage.current) {
      let params = {
        // if there is a tab value, use it, if not, don't
        tab: tab != '-' && tab ? tab : "",
        jobs: filteredJob != '-' ? filteredJob : "",
        slot: slot != '-' ? slot : "",
        page_size: 10,
      }
      axios("https://ms2db.bootando.com/api/items", { params }, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
      }).then((response) => {
        //https://ms2db.bootando.comnull/ net::ERR_NAME_NOT_RESOLVED happens here because Male Skin and Female Skin do not have an icon
        // data for table
        setData(response.data.data);
        // pagination
        setPageCount(response.data.total_pages);
        // set the /tab/ in the url
        setTab(page ? page : "-")
        setSearchTerm("")
      });
    }
    else {
      // on the first render, see if there's something in the URL
      setTab(page ? page : "-")
      didMountPage.current = true
    }
    // do this when the tab (category) or the job filter change
  }, [tab, filteredJob, slot]);

  // search terms: debounce after the inital load
  const didMountRef = useRef(false);
  useDebouncedEffect(() => {
    if (didMountRef.current) {
      handlePage(1)
    }
    else {
      didMountRef.current = true;
    }
  }, [searchTerm], 250);

  // hook for search term
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // handle the page changing through pagination or search terms
  const handlePage = async (e) => {
    var idSearch;

    // If the user is searching for numbers, we only have exact id match
    if (searchTerm.length == 8 && parseInt(searchTerm) >= 10200001) {
      idSearch = parseInt(searchTerm)
    }

    // not sure if this is was how we wanted to handle this? We only have one search bar
    // this will check if the user searched an ID (a number thats above 10200000) and if so
    // get the one item, since we don't have a way to search for partial IDs
    let params = {
      // page number
      page: e,
      // category and job
      tab: tab != '-' && tab ? tab : "",
      jobs: filteredJob != '-' ? filteredJob : "",
      // if the search term wasn't a number
      name: isNaN(searchTerm) ? searchTerm : "",
      // if the search term was a number
      item_id: !isNaN(idSearch) && searchTerm.length === 8 ? idSearch : "",
      page_size: 10,
    }
    let url = `https://ms2db.bootando.com/api/items`;

    axios(url, { params }, {
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

  // For turning page
  const handlePageChange = (event, value) => {
    handlePage(value);
  };


  // Filters can probably be refactored to have one handler for all filters
  // tab = category, passed to filter child which has dropdown
  const handleTabSelect = (event) => {
    history.push(event.target.value)
    // this is because we can go to codex/category/item, but not codex/priest/item
    setTab(event.target.value);
  };

  // for filter changes that don't imapact the url
  const handleFilterChange = (event) => {
    setJob(event.target.value)
  }

  // for filter changes that don't imapact the url
  const handleSlotChange = (event) => {
    setSlot(event.target.value)
  }

  return (
    <div>
      <FilterContainer handleFilterChange={handleFilterChange} handleTabSelect={handleTabSelect} handleSlotChange={handleSlotChange} 
      tab={tab}
      filteredJob={filteredJob}
      slot={slot}></FilterContainer>
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
        <ContentTable headings={headings} data={data} />
      </div>
    </div>
  )
}

export default CodexPage
