import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPartsByStation, getPartVnumbers } from "redux/slices/partSlice";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { Box, Button, Typography, Select} from "@mui/material";

const SelectInfo = ({ handleNext, stationValue,  partValue, setPartList, partList, partVnum, setPartVnum, vnumberValue, handleChange, }) => {
  

  const dispatch = useDispatch();
  const commonState = useSelector((state) => state.common);
  return (
    <Box sx={{ mt: 5 }} component="form">
      <Typography component="h2" variant="h6" color="primary" sx={{ mb: 2 }}>
        Select Station and Part
      </Typography>
      <Box sx={{ width: 300, my: 2 }}>
      <InputLabel id='station_label'>Select Station</InputLabel>
        <Select
          id={'station'}
          value={stationValue}
          fullWidth
          onChange={(e)=>{
            const {
              target: { value },
            } = e;
            handleChange('station', value);
            const res = dispatch(getPartsByStation(
              {station_id: value}))
              res.then((resp)=>{
                if(resp && resp.payload && resp.payload.success){
                  setPartList(resp.payload.part_list)
                }
              })
          }
          }
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

      </Box>
      <Box sx={{ width: 300, my: 2 }}>
      <InputLabel id={'part'}>{'Select Part'}</InputLabel>
        <Select
          id={'part'}
          fullWidth
          value={ partValue }
          onChange={(e)=>{
            const {
              target: { value },
            } = e;
            handleChange('part', value);
            const res = dispatch(getPartVnumbers(
              {part_id: value}))
              res.then((resp)=>{
                if(resp && resp.payload && resp.payload.success){
                  setPartVnum(resp.payload.v_numbers)
                }
              })
          }}
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
      </Box>
      <Box sx={{ width: 300, my: 2 }}>
      <InputLabel id={'vnumber'}>{'Part vNumbers'}</InputLabel>
        <Select
          id={'vnumber'}
          fullWidth
          value={vnumberValue}
          onChange={(e)=>{
            const {
              target: { value },
            } = e;
            handleChange('vnum', value);}}
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
      </Box>
      <Box sx={{ width: 300, mt: 4, display: "flex", gap: 3 }}>
        <Button variant="contained" onClick={handleNext} disabled={partValue && stationValue && vnumberValue ? false : true}>
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default SelectInfo;