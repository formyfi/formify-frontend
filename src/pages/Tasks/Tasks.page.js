import { Box, Button, Drawer, FormControlLabel, Grid, TextField, Typography, Autocomplete} from "@mui/material";
import EnhancedTable from "components/Table";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import * as yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import { getPartList, upsertPart, deletePart } from "redux/slices/partSlice";
import { getStationList } from "redux/slices/stationSlice";

const schema = yup.object({
  // email: yup.string().required(),
}).required();


const TasksPage = () => {
  

  return (
    <Box>
        <Typography component="h2" variant="h6" color="primary" sx={{ mb: 2 }} >
          Manage Tasks
        </Typography>   
     </Box>
  );
};

export default TasksPage;
