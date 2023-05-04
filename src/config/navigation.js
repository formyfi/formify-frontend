import DashboardIcon from "@mui/icons-material/Dashboard";
import HolidayVillageIcon from "@mui/icons-material/HolidayVillage";
import PeopleIcon from "@mui/icons-material/People";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ShutterSpeedIcon from "@mui/icons-material/ShutterSpeed";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import RttIcon from "@mui/icons-material/Rtt";
import TaskIcon from "@mui/icons-material/Task";


const navigationList = [
    {
      id: "dashboard",
      area_id:6,
      label: "Dashboard",
      path: "/app/dashboard",
      role: 1,
      icon: <DashboardIcon />,
    },
    {
      id: 'station',
      area_id:2,
      label: "Operations",
      path: "/app/stations",
      role: 1,
      icon: <HolidayVillageIcon />,
    },
    {
      id: "parts",
      area_id:3,
      label: "Parts",
      path: "/app/parts",
      role: 1,
      icon: <ShutterSpeedIcon />,
    },
    {
      id: "users",
      label: "Users",
      area_id:1,
      path: "/app/users",
      role: 1,
      icon: <PeopleIcon />,
    },
    {
      id: "checklists",
      label: "Checklists",
      area_id:4,
      path: "/app/checklists",
      role: 1,
      icon: <MenuBookIcon />,
    },
    {
      id: "form_builder",
      area_id:4,
      label: "Template Builder",
      path: "/app/formBuilder/0",
      role: 1,
      icon: <RttIcon />,
    },
    {
      id: "tasks",
      area_id:5,
      label: "Start Inspection",
      path: "/app/tasks",
      role: 3,
      icon: <TaskIcon />,
    },
    {
      id: "task_list",
      area_id:5,
      label: "Inspection List",
      path: "/app/inspections",
      role: 3,
      icon: <ListAltIcon />,
    },
  ];


  export default navigationList