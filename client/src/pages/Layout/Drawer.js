import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/mainLogo.png";

// MUI Components
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
import AssessmentIcon from "@mui/icons-material/Assessment";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import SupportAgentRoundedIcon from "@mui/icons-material/SupportAgentRounded";
// import ContactPhoneRoundedIcon from "@mui/icons-material/ContactPhoneRounded";
import PaidRoundedIcon from "@mui/icons-material/PaidRounded";
// import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreRoundedIcon from "@mui/icons-material/StoreRounded";
import FeedbackIcon from "@mui/icons-material/Feedback";

// Custom Components
import AccountMenuComponent from "../Admin/Components/buttons/Menu";

const drawerWidth = 240;
const iconStyle = { fontSize: 20, color: "#777777" };
const listItemTextStyle = {
  "& .MuiListItemText-primary": {
    fontSize: 13,
    fontWeight: 600,
    color: "#777777",
  },
};

function ResponsiveDrawer({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const navigate = useNavigate();

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <div>
      <Toolbar>
        <Link to="/admin">
          <img src={logo} alt="dinodio" style={{ width: 150 }} />
        </Link>
      </Toolbar>
      <Divider />
      <List>
        {[
          {
            icon: <PaidRoundedIcon sx={iconStyle} />,
            text: "Orders",
            link: "/orders",
          },
          {
            icon: <AssessmentIcon sx={iconStyle} />,
            text: "Reports",
            link: "/reports",
          },
          {
            icon: <LocalShippingRoundedIcon sx={iconStyle} />,
            text: "Rental vehicles",
            link: "/admin/rental",
          },
          {
            icon: <SupportAgentRoundedIcon sx={iconStyle} />,
            text: "Inquiries",
            link: "/admin/inquiries",
          },
          // {
          //   icon: <CreditCardIcon sx={iconStyle} />,
          //   text: "Manage cards",
          //   link: "/admin/cards",
          // },
          {
            icon: <StoreRoundedIcon sx={iconStyle} />,
            text: "Products",
            link: "/admin/products",
          },
          {
            icon: <FeedbackIcon sx={iconStyle} />,
            text: "Feedbacks",
            link: "/admin/products/feedback",
          },
          {
            icon: <StoreRoundedIcon sx={iconStyle} />,
            text: "Transactions",
            link: "/admin/transactions",
          },
        ].map((item) => (
          <ListItem
            key={item.text}
            disablePadding
            onClick={() => navigate(item.link)}
          >
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText sx={listItemTextStyle} primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
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
          bgcolor: "white",
          boxShadow: "none",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <div className="w-full flex justify-end">
            <AccountMenuComponent />
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
          onClose={handleDrawerClose}
          ModalProps={{ keepMounted: true }}
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
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          minHeight: "100vh",
          backgroundColor: "#f7f7f7",
        }}
      >
        <Toolbar />
        <div className="usr-drawer-content">{children}</div>
      </Box>
    </Box>
  );
}

export default ResponsiveDrawer;
