import "./App.css";
import { Box, Button } from "@mui/material";
import { DrawerComponent } from "./components/MobileDrawer";
import { menuData } from "./data/menuItems";
import { useState } from "react";

function App() {
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <Box
      sx={{
        height: "100dvh",
      }}
    >
      <Button
        onClick={() => setOpenDrawer(true)}
        sx={{
          borderRadius: "10px",
          textTransform: "capitalize",
          background: "#000",
          color: "white",
        }}
      >
        open menu
      </Button>
      <DrawerComponent
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        menuItems={menuData.menuItems}
      />
    </Box>
  );
}

export default App;
