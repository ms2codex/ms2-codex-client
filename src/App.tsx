import { CodexTable } from "./component/CodexTable";
import {
  AppBar,
  Toolbar,
} from "@mui/material";


export const App = () => {
  return (
    <div>
      <AppBar style={{position: "sticky"}} sx={{background: 'orange'}}>
        <Toolbar variant="dense">
        Placeholder Header
        </Toolbar>
      </AppBar>
      <div style={{overflowY: 'auto'}}>
      <CodexTable></CodexTable>
      </div>
    </div>
  );
};
