import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import { ArrowBack as ArrowBackIcon, ChevronRight } from "@mui/icons-material";
import type { MenuItem } from "../data/menuItems";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SecurityIcon from "@mui/icons-material/Security";
import SettingsIcon from "@mui/icons-material/Settings";
import LanguageIcon from "@mui/icons-material/Language";
import PaletteIcon from "@mui/icons-material/Palette";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HelpIcon from "@mui/icons-material/Help";
import InfoIcon from "@mui/icons-material/Info";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import { motion, type Variants } from "framer-motion";

interface DrawerComponentProps {
  open: boolean;
  onClose: () => void;
  menuItems: MenuItem[];
  anchorEl?: HTMLElement | null;
}

const itemVariants: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.03,
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};

// Map string icon names from menu items to MUI icon components
const iconMap: Record<string, typeof HomeIcon> = {
  HomeIcon,
  PersonIcon,
  AccountCircleIcon,
  SecurityIcon,
  SettingsIcon,
  LanguageIcon,
  PaletteIcon,
  VolumeUpIcon,
  NotificationsIcon,
  HelpIcon,
  InfoIcon,
  ContactSupportIcon,
};

export const DrawerComponent = ({
  open,
  onClose,
  menuItems,
}: DrawerComponentProps) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [currentLevel, setCurrentLevel] = useState<MenuItem[]>(menuItems); // State for current visible menu level
  const [navigationStack, setNavigationStack] = useState<MenuItem[][]>([]); //  State for history
  const [currentParent, setCurrentParent] = useState<string>("Home"); // State for the current menu header title

    // Handle click on a menu item
  const handleItemClick = (item: MenuItem) => {
    if (item.children && item.children.length > 0) {
       // If item has children, navigate into submenu
      setNavigationStack([...navigationStack, currentLevel]);// Save current level to stack
      setCurrentLevel(item.children); // Save current level to stack
      setCurrentParent(item.label); // Update header title
    } else {
      //if no children, close the drawer
      onClose();
    }
  };

  // Handle back button click
  const handleBackClick = () => {
    if (navigationStack.length > 0) {
      const previousLevel = navigationStack[navigationStack.length - 1];
      console.log(previousLevel, "previousLevel");
      setNavigationStack(navigationStack.slice(0, -1));
      setCurrentLevel(previousLevel);
      setCurrentParent(navigationStack.length === 1 ? "Home" : "Previous");
    }
  };

    // Reset when closing
  const handleClose = () => {
    setCurrentLevel(menuItems);
    setNavigationStack([]);
    setCurrentParent("Home");
    onClose();
  };

  return (
    <Drawer
      anchor={isMobile ? "bottom" : "left"}
      open={open}
      onClose={handleClose}
      transitionDuration={{ enter: 500, exit: 500 }}
      aria-labelledby="drawer"
      sx={{
        "& .MuiDrawer-paper": {
          width: { xs: "92%", md: "400px" },
          background: "white",
          color: "black",
          height: { md: "100dvh", xs: "85dvh" },
          borderRadius: { md: 0, xs: "25px" },
          transition: "all 0.5s ease",
          mb: "1.5rem",
          mx: "auto",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
        role="navigation"
        aria-label="Main navigation menu"
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            p: 2,
          }}
        >
          {navigationStack.length > 0 && (
            <IconButton
              onClick={handleBackClick}
              sx={{
                color: "black",
              }}
              aria-label="back"
            >
              <ArrowBackIcon />
            </IconButton>
          )}
          <Typography
            id="drawer-title"
            variant="h6"
            sx={{
              fontWeight: 600,
              flex: 1,
            }}
          >
            {currentParent}
          </Typography>
        </Box>

        {/* Menu items */}
        <Box sx={{ flex: 1, overflow: "hidden", py: 2 }}>
          <List sx={{ py: 1 }}>
            {currentLevel.map((item) => {
              const IconComponent = iconMap[item.icon];

              return (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <ListItem
                    key={item.id}
                    disablePadding
                    sx={{
                      mb: 2,
                    }}
                  >
                    <ListItemButton
                      onClick={() => handleItemClick(item)}
                      sx={{
                        mx: 1,
                        mb: 0.5,
                        borderRadius: 2,
                        transition: "all 0.2s ease",
                        "&:hover": {
                          backgroundColor: "rgba(255, 255, 255, 0.15)",
                          transform: "translateX(8px)",
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                        },
                      }}
                      role="menuitem"
                      aria-label={item.label}
                    >
                      <ListItemIcon
                        sx={{
                          color: "black",
                          minWidth: 40,
                        }}
                      >
                        <IconComponent />
                      </ListItemIcon>

                      <ListItemText
                        primary={item.label}
                        sx={{
                          "& .MuiTypography-root": {
                            fontWeight: 500,
                            fontSize: "0.95rem",
                          },
                        }}
                      />

                      {item.children && <ChevronRight />}
                    </ListItemButton>
                  </ListItem>
                </motion.div>
              );
            })}
          </List>
        </Box>
      </Box>
    </Drawer>
  );
};
