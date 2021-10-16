import {styled} from "@mui/material/styles";
import TableCell from "@mui/material/TableCell";

const CustomCell = styled(TableCell)(({ theme }) => ({
  fontSize: 15,
  color: "#FFFFFF",
  borderBottom: "1px solid #6e6e70",
}));

export default CustomCell
