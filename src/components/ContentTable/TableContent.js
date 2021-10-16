import React from 'react'
import TableBody from "@mui/material/TableBody";
import CustomCell from "./CustomCell";
import CustomRow from "./CustomRow";

const TableContent = ({ data }) => { /// this should be customized to accept data dynamically but for now it'll do
  return (
    <TableBody>
      {data.map(({ item_id, slot_icon, name, slot }) => (
        <CustomRow key={item_id} sx={{ height: "6vh" }}>
          <CustomCell align="left">{item_id}</CustomCell>
          <CustomCell align="left">
            <div // this should be make a styled component
              style={{
                borderRadius: "3px",
                boxShadow: "inset 0 0 15px #232123",
                display: "flex",
                justifyContent: "center",
                width: "fit-content",
              }}
            >
              <img
                style={{ maxHeight: "5vh", maxWidth: "5vh" }} // this should be made a styled cmponent
                src={`https://ms2db.bootando.com${slot_icon}`}
                onError={(e)=>{e.target.src="https://ms2db.bootando.com/item/icon/customize/10400209.png"}} // you cannot set default like this and it's not clear what you want to do
              >
              </img>
            </div>
          </CustomCell>
          <CustomCell align="left">{name}</CustomCell>
          <CustomCell align="left">{slot}</CustomCell>
        </CustomRow>
      ))}
    </TableBody>
  )
}

export default TableContent
