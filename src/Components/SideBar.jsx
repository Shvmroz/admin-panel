import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import logo from "../Images/logo.png";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { Link } from "react-router-dom";
import { AccountCircle, SupportAgent } from "@mui/icons-material";
import LeaderboardTwoTone from "@mui/icons-material/LeaderboardTwoTone";
import AccountBox from "@mui/icons-material/AccountBox";
import { CircularProgress, Popover } from "@mui/material";
import { logout } from "./logout";
import { useNavigate } from "react-router-dom";
import ChangePasswordModal from "./ChangePassword";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const drawerWidth = 240;

function SideBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [email, setEmail] = useState("");
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    // Retrieve email from local storage
    console.log("Sidebar check");
    const storedEmail = localStorage.getItem("email");
    setEmail(storedEmail);
  }, []);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  // handle logout
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true); // Show loader
    setTimeout(async () => {
      const success = await logout(navigate);
      setLoading(false); // Hide loader
      if (success) {
        console.log("Logout successful");
      } else {
        console.log("Logout failed");
      }
    }, 2000); // 2 seconds timeout
  };

  // Drop down Menu on profile icon click
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const drawer = (
    <div className="drawer">
      <Toolbar>
        <img
          src={logo}
          alt="logo"
          style={{ width: "100%", display: "flex", margin: "auto" }}
        />
      </Toolbar>

      <Divider />
      {/* Dashboard */}
      <List>
        <ListItem>
          <ListItemButton
            component={Link}
            to="/dashboard"
            selected={location.pathname === "/dashboard"}
            sx={{
              borderRadius: 2,
              "&.Mui-selected": {
                backgroundColor: "#feaf00",
              },
              "&.Mui-selected:hover": {
                backgroundColor: "#feaf00",
              },
            }}
          >
            <ListItemIcon>
              <LeaderboardTwoTone />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>

        {/* Customer */}
        <ListItem>
          <ListItemButton
            component={Link}
            to="/customer"
            selected={location.pathname === "/customer"}
            sx={{
              borderRadius: 2,
              "&.Mui-selected": {
                backgroundColor: "#feaf00",
              },
              "&.Mui-selected:hover": {
                backgroundColor: "#feaf00",
              },
            }}
          >
            <ListItemIcon>
              <AccountBox />
            </ListItemIcon>
            <ListItemText primary="Customers" />
          </ListItemButton>
        </ListItem>

        {/* Support Ticket */}
        <ListItem>
          <ListItemButton
            component={Link}
            to="/Ticket"
            selected={location.pathname === "/Ticket"}
            sx={{
              borderRadius: 2,
              "&.Mui-selected": {
                backgroundColor: "#feaf00",
              },
              "&.Mui-selected:hover": {
                backgroundColor: "#feaf00",
              },
            }}
          >
            <ListItemIcon>
              <SupportAgent />
            </ListItemIcon>
            <ListItemText primary="Support Ticket" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "white", // Set background color to white
          boxShadow: "none", // Remove shadow
        }}
      >
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <div style={{ marginLeft: "auto" }}>
            <Box>
              <IconButton onClick={handleClick}>
                <AccountCircle sx={{ fontSize: 40 }} />{" "}
                {/* Your profile icon */}
              </IconButton>
              <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <List sx={{ margin: "5px" }}>
                  <ListItem
                    disablePadding
                    sx={{
                      "&:hover": {
                        backgroundColor: "#feaf00",
                        borderRadius: "10px",
                      },
                    }}
                  >
                    <ListItemButton>
                      <ListItemText primary={email} />
                    </ListItemButton>
                  </ListItem>

                  <ListItem
                    disablePadding
                    sx={{
                      "&:hover": {
                        backgroundColor: "#feaf00",
                        borderRadius: "10px",
                      },
                    }}
                  >
                    <ListItemButton onClick={handleOpenModal}>
                      <ListItemText primary="Change Password" />
                    </ListItemButton>
                  </ListItem>
                  <ChangePasswordModal
                    open={openModal}
                    onClose={handleCloseModal}
                  />

                  <ListItem
                    disablePadding
                    sx={{
                      "&:hover": {
                        backgroundColor: "#feaf00",
                        borderRadius: "10px",
                      },
                    }}
                  >
                    <ListItemButton onClick={handleLogout}>
                      <ListItemIcon>
                        <ExitToAppIcon />
                      </ListItemIcon>
                      {loading ? (
                        // Show spinner if loading
                        <CircularProgress size={24} />
                      ) : (
                        // Show text if not loading
                        <ListItemText primary="Log out" />
                      )}
                    </ListItemButton>
                  </ListItem>
                </List>
              </Popover>
            </Box>
          </div>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

export default SideBar;
