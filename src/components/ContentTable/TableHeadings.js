import React from 'react'

import TableHead from "@mui/material/TableHead";
import {styled} from "@mui/material/styles";

import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

const TopRow = styled(TableRow)`
    background-color: #6e6e70;
    border-radius: 5px;
    color: white;
    text-shadow: 2px 2px 3px #232123, 0 0 1em #232123, 0 0 0.5em #232123;
    border-bottom: 1px solid #6e6e70;
  `;

const TopCell = styled(TableCell)(({ theme }) => ({
  fontSize: 15,
  color: "#FFFFFF",
  borderBottom: "1px solid #444446",
}));

const TableHeadings = ({ headings }) => {
  return (
    <TableHead>
      <TopRow>
        {headings.map(heading => (
          <TopCell
            style={{ borderRight: "1px solid #444446" }}
            align="left"
          >
            {heading}
          </TopCell>
        ))}
      </TopRow>
    </TableHead>
  )
}

export default TableHeadings
