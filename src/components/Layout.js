import React,{ useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import EvStation from '@mui/icons-material/EvStation';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ShutterSpeedIcon from '@mui/icons-material/ShutterSpeed';
import { Outlet, useLocation, useMatch, useNavigate } from 'react-router-dom';
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
import PeopleIcon from '@mui/icons-material/People';
import ConstructionIcon from '@mui/icons-material/Construction';
import DashboardIcon from '@mui/icons-material/Dashboard';
import RttIcon from '@mui/icons-material/Rtt';
import TaskIcon from '@mui/icons-material/Task';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { Avatar, Menu, MenuItem } from '@mui/material';
import { Logout, Settings } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { logout, logoutApiAction } from 'redux/slices/commonSlice';

var drawerWidth = 50;



const AppBar = styled(MuiAppBar)(({ theme }) => ({
  position: 'fixed',
  zIndex: theme.zIndex.drawer - 1,
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    marginLeft: `50px`,
    marginRight: `50px`,
    transition: 'margin-left 0.3s ease-in-out, width 0.3s ease-in-out',
    width: `${open ? `calc(100% - 240px)` : `calc(100% - 50px)`}`,
  })
);


const RightSideMenu = ({ anchorEl,open,logout,handleClose })=>{

  return (<Menu
    anchorEl={anchorEl}
    id="account-menu"
    open={open}
    onClose={handleClose}
    onClick={handleClose}
    PaperProps={{
      elevation: 0,
      sx: {
        overflow: 'visible',
        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
        mt: 1.5,
        '& .MuiAvatar-root': {
          width: 32,
          height: 32,
          ml: -0.5,
          mr: 1,
        },
        '&:before': {
          content: '""',
          display: 'block',
          position: 'absolute',
          top: 0,
          right: 14,
          width: 10,
          height: 10,
          bgcolor: 'background.paper',
          transform: 'translateY(-50%) rotate(45deg)',
          zIndex: 0,
        },
      },
    }}
    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
  >
    <MenuItem onClick={logout}>
      <ListItemIcon>
        <Logout fontSize="small" />
      </ListItemIcon>
      Logout
    </MenuItem>
  </Menu>)
}

export default function Layout() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [title, setTitle] = React.useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isHovering, setIsHovering] =  React.useState(false);
  const openRightSide = Boolean(anchorEl);
  const navigate = useNavigate();
  const location = useLocation();
  const commonState = useSelector(state => state.common);
  const dispatch = useDispatch();

  const navigationList = [
    {
      id: 'dashboard',
      label: "Dashboard",
      path: "/app/dashboard",
      role: 1,
      icon: <DashboardIcon />
    },
    {
      id: 'station',
      label: "Departments",
      path: "/app/stations",
      role: 1,
      icon: <HolidayVillageIcon />
    },
    {
      id: 'parts',
      label: "Parts",
      path: "/app/parts",
      role: 1,
      icon: <ShutterSpeedIcon />
    },
    {
      id: 'users',
      label: "Users",
      path: "/app/users",
      role: 1,
      icon: <PeopleIcon />
    },
    {
      id: 'checklists',
      label: "Checklists",
      path: "/app/checklists",
      role: 1,
      icon: <MenuBookIcon />
    },
    {
      id: 'form_builder',
      label: "Template Builder",
      path: "/app/formBuilder/0",
      role: 1,
      icon: <RttIcon />
    },
    {
      id: 'tasks',
      label: "Start Inspection",
      path: "/app/tasks",
      role: 3,
      icon: <TaskIcon />
    },
    {
      id: 'task_list',
      label: "Inspection List",
      path: "/app/taskslist",
      role: 3,
      icon: <ListAltIcon />
    },
  ]

  const handleMouseEnter = () => {
    setIsHovering(true);
    drawerWidth = 240;
  };
  
  const handleMouseLeave = () => {
    setIsHovering(false);
    drawerWidth = 50;
  };

  const openRightSideHandler = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const openRightSideCloseHandler = () => {
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(()=>{
    if(commonState.isLogged === false) {
      navigate('/login')
    }
  },[]);

  useEffect(()=>{
    const currentPage = navigationList.filter((item)=>item.path === location.pathname);
    if(currentPage && currentPage.length) setTitle(currentPage[0].label);
  },[location]);
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            display={'flex'}
            width="100%"
            justifyContent='space-between'
          >
            <Typography variant="h6" noWrap component="div">
              {commonState.org_name || title}
            </Typography>
            <Box  onClick={openRightSideHandler} >
              <Avatar>AD</Avatar>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          zIndex: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        {/* <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader> */}
        <Divider />
        <List  sx={{ mt: 7 }} >
          { navigationList.map((list, index) => (
            ((parseInt(commonState.user_type_id) === 3 && list.role === 3) || (parseInt(commonState.user_type_id) === 1 ) 
            ?
            <ListItem key={list.id} disablePadding  
              onMouseEnter={() => handleMouseEnter()}
              onMouseLeave={() => handleMouseLeave()}
              sx={{ height: "70px" }}>
              <ListItemButton onClick={()=>{
                navigate(list.path)
              }} >
                <ListItemIcon sx={{ color: "primary.main" }}>
                  {list.icon}
                </ListItemIcon>
                {isHovering ? (
                <ListItemText primary={list.label} />
              ) : null}
              </ListItemButton>
            </ListItem>:null)
          ))}
        </List>
      </Drawer>
      <RightSideMenu logout={()=>{
        navigate('/login')
          dispatch(logoutApiAction())
          dispatch(logout())
            localStorage.removeItem('persist:root')
        
      }} anchorEl={anchorEl} open={openRightSide} handleClose={openRightSideCloseHandler} />
      <Main open={open}>
        <DrawerHeader />
        <Outlet />
      </Main>
    </Box>
  );
}
