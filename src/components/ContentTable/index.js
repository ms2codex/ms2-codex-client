import React from 'react';
import TableHeadings from "./TableHeadings";
import TableContent from "./TableContent";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";

const ContentTable = ({ headings, data }) => {
  return (
    <>
      <TableContainer component={Paper} sx={{ width: "40%", margin: "20px" }}>
        <Table
          sx={{ background: "#ffc600" }}
          size="small"
          aria-label="simple table"
        >
          <TableHeadings headings={headings} />
          <TableContent data={data} />
        </Table>
      </TableContainer>
    </>
  );
};

export default ContentTable;
