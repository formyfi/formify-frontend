import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPartsByStation, getPartVnumbers } from "redux/slices/partSlice";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { Box, Button, Typography, Select} from "@mui/material";

const SelectInfo = ({ handleNext, stationValue,  partValue, setPartList, partList, partVnum, setPartVnum, vnumberValue, handleChange, setFetchVnumbers, fetchVnumbers}) => {
  const dispatch = useDispatch();
  const commonState = useSelector((state) => state.common);
  React.useEffect(() => {
    if (fetchVnumbers) {
      const res = dispatch(getPartVnumbers(
        {part_id: partValue, station_id: stationValue, org_id: commonState.org_id}))
        res.then((resp)=>{
          if(resp && resp.payload && resp.payload.success){
            setPartVnum(resp.payload.v_numbers)
          }
          setFetchVnumbers(false);
        })
    }
  }, [fetchVnumbers]);
  return (
    <Box sx={{ mt: 5 }} component="form">
      <Typography component="h2" variant="h6" color="primary" sx={{ mb: 2 }}>
        Select Operation and Part
      </Typography>
      <Box sx={{ width: 300, my: 2 }}>
      <InputLabel id='station_label'>Select Operation</InputLabel>
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
              {part_id: value, station_id: stationValue, org_id: commonState.org_id}))
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
      <InputLabel id={'vnumber'}>{'Part Serial Numbers'}</InputLabel>
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
              {ut.v_num_label}
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
