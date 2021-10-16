import { CodexTable } from "./component/CodexTable";
import {
  AppBar,
  Toolbar,
} from "@mui/material";

export const App = () => {
  return (
    <div>
      <AppBar style={{position: "sticky"}} sx={{background: 'orange'}}>
        <Toolbar variant="dense" sx={{display: 'flex', justifyContent: 'center'}}>
        <img src={require('../public/pictures/site_logo.png')}></img>
        </Toolbar>
      </AppBar>
      <div style={{overflowY: 'auto'}}>
      <CodexTable></CodexTable>
      </div>
    </div>
  );
};
