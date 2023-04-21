import React, { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { Outlet, useLocation, useMatch, useNavigate } from "react-router-dom";


import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { Avatar, Menu, MenuItem } from "@mui/material";
import { Logout, Settings } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { logout, logoutApiAction } from "redux/slices/commonSlice";
import LOGO from "./LOGO.png";
import useMediaQuery from "@mui/material/useMediaQuery";
import RightSideMenu from "./RightSideMenu";
import ChangePasswordForm from "pages/Dashboard/ChangePasswordForm";


import { createClient } from '@supabase/supabase-js'
import navigationList from "config/navigation";
import { toast } from "react-toastify";


const supabaseUrl = 'https://xulrhkdfzsueagghuwxr.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1bHJoa2RmenN1ZWFnZ2h1d3hyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE1ODc5NzIsImV4cCI6MTk5NzE2Mzk3Mn0.8isSZKd__PnoGmjQynQHvEpa94ERxv8fzUyJkMlifhc'
const supabase = createClient(supabaseUrl, supabaseAnonKey)


export {
  supabase
}

//var drawerWidth = 50;

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  position: "fixed",
  backgroundColor: "#05386B",
  zIndex: theme.zIndex.drawer - 1,
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),

    marginRight: `50px`,
    transition: "margin-left 0.3s ease-in-out, width 0.3s ease-in-out",
    width: `${open ? `calc(100% - 240px)` : `calc(100% - 50px)`}`,
  })
);

// const RightSideMenu = ({ anchorEl,open,logout,handleClose })=>{

//   return (<Menu
//     anchorEl={anchorEl}
//     id="account-menu"
//     open={open}
//     onClose={handleClose}
//     onClick={handleClose}
//     PaperProps={{
//       elevation: 0,
//       sx: {
//         overflow: 'visible',
//         filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
//         mt: 1.5,
//         '& .MuiAvatar-root': {
//           width: 32,
//           height: 32,
//           ml: -0.5,
//           mr: 1,
//         },
//         '&:before': {
//           content: '""',
//           display: 'block',
//           position: 'absolute',
//           top: 0,
//           right: 14,
//           width: 10,
//           height: 10,
//           bgcolor: 'background.paper',
//           transform: 'translateY(-50%) rotate(45deg)',
//           zIndex: 0,
//         },
//       },
//     }}
//     transformOrigin={{ horizontal: 'right', vertical: 'top' }}
//     anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
//   >
//     <MenuItem onClick={logout}>
//       <ListItemIcon>
//         <Logout fontSize="small" />
//       </ListItemIcon>
//       Logout
//     </MenuItem>
//   </Menu>)
// }

export default function Layout() {
  const theme = useTheme();
  const [drawerWidth, setWidth] = React.useState(50);
  const [title, setTitle] = React.useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const commonState = useSelector((state) => state.common);
  const dispatch = useDispatch();
  const isTabletOrMobile = useMediaQuery("(max-width: 1024px)"); // Set the threshold value as per your requirement

  const [showChangePassword, setShowChangePassword] = useState(false);
  const [hideContent, setHideContent] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  useEffect(()=>{
    if(location.pathname === "/app/change-password"){
      setShowChangePassword(true)
    } else {
      setShowChangePassword(false)
    }

  },[location.pathname])


  
  const handleDrawerToggle = () => {
    let w = drawerWidth === 50 ? 240 : 50;
    setWidth(w);
  };

  useEffect(() => {
    if (commonState.isLogged === false) {
      navigate("/login");
    }
  }, []);


  useEffect(() => {
    const currentPage = navigationList.filter(
      (item) => item.path === location.pathname
    );
    if (currentPage && currentPage.length) setTitle(currentPage[0].label);
      let activePath = '';
      if(location.pathname.includes('formBuilder')){
        activePath = navigationList.find(itm => itm.path.includes('formBuilder'));
      } else activePath = navigationList.find(itm => location.pathname.slice('/').includes(itm.path));
    
    let areas = commonState.user_areas.split(',')
    let access = areas.includes(String(activePath?.area_id))
    console.log(access);
    setActiveMenu(activePath)
    if(access === false){
      setHideContent(true);
    } else {
      setHideContent(false);
    }
  }, [location]);



  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Box
            display={"flex"}
            width="100%"
            justifyContent="space-between"
            alignItems={"center"}
          >
            {/* <img src={LOGO} style={{ height: "auto", width: "150px" }} alt="logo"   /> */}
            <Typography variant="h6" noWrap component="div">
              {commonState.org_name || title}
            </Typography>
            <Box>
              <RightSideMenu
                logout={() => {
                  dispatch(logoutApiAction());
                  dispatch(logout());
                  localStorage.removeItem("persist:root");
                  supabase.auth.signOut().then(()=>{
                    navigate("/login");
                  });
                }}
                changePassword={() => {
                  setShowChangePassword(true);
                }}
              />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        open={showChangePassword}
        anchor="right"
        PaperProps={{ sx: { width: "500px" } }}
        onClose={() => {
          setShowChangePassword(false)
        }}
        variant={'temporary'}
      >
        <ChangePasswordForm />
      </Drawer>
      <Drawer
        sx={{
          width: drawerWidth,
          overflowX: "hidden",
          flexShrink: 0,
          zIndex: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
          "& .MuiDrawer-paper::-webkit-scrollbar": {
            display: "none",
          },
        }}
        variant="persistent"
        anchor="left"
        open={true}
        classes={{
          root: {
            backgroundColor: "red",
          },
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
            onClick={handleDrawerToggle}
          >
            <DrawerHeader sx={{ mt: 8, ml: 2, display: "flex" }}>
              <IconButton sx={{}}>
                {drawerWidth === 240 ? (
                  <ChevronLeftIcon />
                ) : (
                  <ChevronRightIcon />
                )}
              </IconButton>
            </DrawerHeader>
          </div>
          <Divider />
          <List>
            {navigationList.map((list, index) =>
              commonState.user_details.super_user === 1 || (commonState.user_areas &&  commonState.user_areas.includes(list.area_id)) ? (
                <ListItem
                  key={list.id}
                  disablePadding
                  sx={{ my: 2, height: "50px",backgroundColor: activeMenu && list.id === activeMenu.id?'lightblue':'', }}
                  className="active"
                >
                  <ListItemButton
                    onClick={() => {
                      navigate(list.path);
                      if(window.innerWidth <= 786){
                        setWidth(50);
                      }
                    }}
                  >
                    <ListItemIcon sx={{ color: "primary.main" }}>
                      {list.icon}
                    </ListItemIcon>
                    {drawerWidth === 240 ? (
                      <ListItemText primary={list.label} />
                    ) : null}
                  </ListItemButton>
                </ListItem>
              ) : null
            )}
          </List>
        </div>
      </Drawer>

      <Main open={drawerWidth === 240 ? true : false}>
        <DrawerHeader />
        {hideContent?<>Not permission to check this</>:<Outlet />}
      </Main>
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          right: 0,
          mr: 2,
          mb: 2,
          zIndex: 9999,
        }}
      >
        {isTabletOrMobile ? (
          <img
            src={LOGO}
            alt="logo"
            style={{ width: "50px", marginLeft: "8px" }}
          />
        ) : (
          <>
            <Typography variant="h8" color="textSecondary">
              Powered by
            </Typography>
            <img
              src={LOGO}
              alt="logo"
              style={{ width: "50px", marginLeft: "8px" }}
            />
          </>
        )}
      </Box>
    </Box>
  );
}
