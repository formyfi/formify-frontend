import { Box, Button, Drawer, FormControlLabel, Grid, TextField, Typography } from "@mui/material";
import EnhancedTable from "components/Table";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import { getStationList, upsertStation, deleteStation } from "redux/slices/stationSlice";

const schema = yup.object({
  // email: yup.string().required(),
}).required();
const initialStationForm = {
  id:'',
  name:'',
  type: ''
}
const headCells = [
  {
    id: "id",
    numeric: true,
    disablePadding: false,
    label: "id",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
  {
    id: "type",
    numeric: false,
    disablePadding: true,
    label: "Type",
  },
  {
    id: "action",
    numeric: false,
    disablePadding: true,
    label: "Action",
  },
];

const StationPage = () => {
  const [drawer, setDrawer] = useState(false);
  const [newStation, setNewStation] = useState(false);
  const [stationForm, setStationForm] = useState(initialStationForm)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema)
  });
  
  const dispatch = useDispatch();
  const stationState = useSelector(state => state.station);
  const commonState = useSelector(state => state.common);
  
  React.useEffect(()=>{
    dispatch(getStationList(
      {org_id: commonState.org_id}))
}, [])

const onSubmit = ()=>{
  dispatch(upsertStation(
    {...stationForm, org_id: commonState.org_id}))
    setDrawer(false);
    setStationForm(initialStationForm);
}

  return (
    <Box>
      <Box
        display={"flex"}
        justifyContent="space-between"
        alignItems={"center"}
      >
        <Typography variant="h4" sx={{ mb: 2 }} component="h2">
        </Typography>
        <Box>
          <Button
            variant="outlined"
            style = {{ marginBottom : 25 }}
            startIcon={<AddIcon />}
            onClick={() => {
              setDrawer(true);
              setNewStation(true);
              setStationForm({...initialStationForm});
            }}
          >
            Add new station
          </Button>
        </Box>
      </Box>
      <EnhancedTable
        headCells={headCells}
        station={true}
        rows={stationState.station_list}
        handleTableChange={(tableProps) => {
          console.log(tableProps);
        }}
        editButton={true}
        deleteButton={true}
        onEdit={(id, row) => {
          let stationData = {...stationForm}
          stationData['id'] = row.id;
          stationData['name'] = row.name;
          stationData['type'] = row.type;
          setStationForm(stationData);
          setDrawer(true);
          setNewStation(false);
        }}
        onDelete={(id) => {
          dispatch(deleteStation(
            {id:id, org_id: commonState.org_id}))
        }}
      />
      <Drawer
        open={drawer}
        anchor="right"
        PaperProps={{ sx: { width: "500px" } }}
        onClose={() => {
          setDrawer(false);
          setStationForm(initialStationForm);
        }}
        variant={'temporary'}
      >
        <Box
          sx={{
            p: 2
          }}
        >
          <Typography variant="h5" sx={{ mb: 2 }}> {newStation ? 'Add new' : 'Edit'} station </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id={stationForm.name}
              label="Name"
              value={stationForm.name}
              onChange={(e)=>{
                let stationData = {...stationForm}
                stationData['name'] = e.target.value;
                setStationForm(stationData);
              }}
              name="name"
              autoComplete="name"
              error={errors.name}
              helperText={errors?.name?.message}
              autoFocus
            />

            <TextField
              margin="normal"
              fullWidth
              id={stationForm.type}
              label="Station Type"
              value={stationForm.type}
              onChange={(e)=>{
                let stationData = {...stationForm}
                stationData['type'] = e.target.value;
                setStationForm(stationData);
              }}
              name="type"
              autoComplete="type"
              error={errors.type}
              helperText={errors?.type?.message}
              autoFocus
            />
            <div>
            <Button
              type="submit"
              
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {newStation ? 'Submit' : 'Update'}
            </Button>
            <Button
              type="button"
              variant="contained"
              onClick={()=>{
                setDrawer(false)
                setStationForm({...initialStationForm})
              }}
              sx={{ mt: 3, mb: 2, ml:2 }}
            >
              Cancel
            </Button>
            </div>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};

export default StationPage;
