import { Box, Button, Drawer, FormControlLabel, Grid, TextField, Typography, Autocomplete, Divider} from "@mui/material";
import EnhancedTable from "components/Table";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import * as yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import { getPartsByStation, getPartVnumbers } from "redux/slices/partSlice";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
const schema = yup.object({
  // email: yup.string().required(),
}).required();

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const steps = ['Select Station', 'Select Part', 'Select Vnumber'];

const TasksPage = () => {
  
  const dispatch = useDispatch();
  const commonState = useSelector(state => state.common);
  
  console.log(commonState.user_stations);
  // React.useEffect(()=>{
  //   dispatch(getPartsByStation(
  //     {station_id: commonState.user_details?.station_}))
  //     dispatch(getStationList(
  //       {org_id: commonState.org_id}))
  // }, [])
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [next, setNext] = React.useState(false);
  const [stationValue, setStationValue] = React.useState('');
  const [partValue, setPartValue] = React.useState('');
  const [vnumValue, setVnumValue] = React.useState('');
  const [partList, setPartList] = React.useState([]);
  const [partVnum, setPartVnum] = React.useState([]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box>
        <Stepper activeStep={activeStep}>
        {steps.map((label) => {
          return (
            <Step key={label}>
              <StepLabel >{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
          {
            activeStep === 0 ? (
              <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id={activeStep}> Select Station</InputLabel>
              <Select
                labelId={activeStep}
                id={activeStep}
                value={stationValue }
                onChange={(e)=>{
                  const {
                    target: { value },
                  } = e;
                  setStationValue(value)
                  const res = dispatch(getPartsByStation(
                    {station_id: value}))
                    res.then((resp)=>{
                      if(resp && resp.payload && resp.payload.success){
                        setPartList(resp.payload.part_list)
                      }
                    })
                }
                }
                input={<OutlinedInput label="Station" />}
                MenuProps={MenuProps}
              >
                {commonState.user_stations && commonState.user_stations.length && commonState.user_stations.map((ut) => (
                  <MenuItem
                    key={ut.value}
                    value={ut.value}
                  >
                    {ut.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            ) : (activeStep === 1 ? 
              
              <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id={activeStep}>{'Select Part'}</InputLabel>
              <Select
                labelId={activeStep}
                id={activeStep}
                value={ partValue }
                onChange={(e)=>{
                  const {
                    target: { value },
                  } = e;
                  setPartValue(value)
                  const res = dispatch(getPartVnumbers(
                    {part_id: value}))
                    res.then((resp)=>{
                      if(resp && resp.payload && resp.payload.success){
                        setPartVnum(resp.payload.v_numbers)
                      }
                    })
                }}
                input={<OutlinedInput label="Name" />}
                MenuProps={MenuProps}
              >
                {partList && partList.length && partList.map((ut) => (
                  <MenuItem
                    key={ut.value}
                    value={ut.value}
                  >
                    {ut.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
              
              :
              <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id={activeStep}>{'Part vNumbers'}</InputLabel>
              <Select
                labelId={activeStep}
                id={activeStep}
                value={vnumValue}
                onChange={(e)=>{
                  const {
                    target: { value },
                  } = e;
                  setVnumValue(value)}}
                input={<OutlinedInput label="Name" />}
                MenuProps={MenuProps}
              >
                {partVnum && partVnum.length && partVnum.map((ut) => (
                  <MenuItem
                    key={ut.v_num}
                    value={ut.v_num}
                  >
                    {ut.v_num}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
              )

          }
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button disabled={next} onClick={handleNext}>
              { activeStep === steps.length - 1 ? 'Open Checklist' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}  
     </Box>
  );
};

export default TasksPage;
