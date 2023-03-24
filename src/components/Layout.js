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
import InboxIcon from '@mui/icons-material/MoveToInbox';
import VerifiedUser from '@mui/icons-material/VerifiedUser';
import EvStation from '@mui/icons-material/EvStation';
import { Outlet, useLocation, useMatch, useNavigate } from 'react-router-dom';
import PeopleIcon from '@mui/icons-material/People';
import ConstructionIcon from '@mui/icons-material/Construction';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddTaskIcon from '@mui/icons-material/AddTask';
import LogoutIcon from '@mui/icons-material/Logout';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { Avatar, Menu, MenuItem } from '@mui/material';
import { Logout, Settings } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'redux/slices/commonSlice';

const drawerWidth = 240;

const navigationList = [
  {
    id: 'dashboard',
    label: "Admin Dashboard",
    path: "/app/dashboard",
    icon: <DashboardIcon />
  },
  {
    id: 'users',
    label: "Manage Users",
    path: "/app/users",
    icon: <PeopleIcon />
  },
  {
    id: 'parts',
    label: "Manage Parts",
    path: "/app/parts",
    icon: <ConstructionIcon />
  },
  {
    id: 'station',
    label: "Manage Stations",
    path: "/app/stations",
    icon: <EvStation />
  },
  {
    id: 'checklists',
    label: "Manage Checklists",
    path: "/app/checklists",
    icon: <MenuIcon />
  },
  {
    id: 'tasks',
    label: "Tasks",
    path: "/app/tasks",
    icon: <InsertDriveFileIcon />
  },
]

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
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
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
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
    <MenuItem onClick={handleClose}>
      <Avatar /> Profile
    </MenuItem>
    <MenuItem onClick={handleClose}>
      <ListItemIcon>
        <Settings fontSize="small" />
      </ListItemIcon>
       Settings
    </MenuItem>
    <Divider />
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
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openRightSide = Boolean(anchorEl);
  const navigate = useNavigate();
  const location = useLocation();
  const commonState = useSelector(state => state.common);
  const dispatch = useDispatch();

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
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {navigationList.map((list, index) => (
            <ListItem key={list.id} disablePadding>
              <ListItemButton onClick={()=>{
                navigate(list.path)
                setOpen(false)
              }} >
                <ListItemIcon>
                  {list.icon}
                </ListItemIcon>
                <ListItemText primary={list.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <RightSideMenu logout={()=>{
        dispatch(logout())
        navigate('/login')
      }} anchorEl={anchorEl} open={openRightSide} handleClose={openRightSideCloseHandler} />
      <Main open={open}>
        <DrawerHeader />
        <Outlet />
      </Main>
    </Box>
  );
}
