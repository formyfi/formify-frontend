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
import AutocompleteCustom from "components/AutocompleteCustom";

const schema = yup.object({
  // email: yup.string().required(),
}).required();
const initialPartForm = {
  id:'',
  name:'',
  description: ''
}
const headCells = [
  {
    id: "id",
    numeric: true,
    disablePadding: false,
    label: "ID",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
  {
    id: "description",
    numeric: false,
    disablePadding: true,
    label: "Description",
  },
  {
    id: "action",
    numeric: false,
    disablePadding: true,
    label: "Action",
  },
];

const PartsPage = () => {
  const [drawer, setDrawer] = useState(false);
  const [newPart, setNewPart] = useState(false);
  const [partForm, setPartForm] = useState(initialPartForm)
  const [selectedImage, setSelectedImage] = useState(null);
  const [stationInputValue, setStationInputValue] = React.useState('');
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
  const partState = useSelector(state => state.part);
  const commonState = useSelector(state => state.common);
  
  React.useEffect(()=>{
    dispatch(getPartList(
      {org_id: commonState.org_id}))
      dispatch(getStationList(
        {org_id: commonState.org_id}))
}, [])

const onSubmit = ()=>{
 const res = dispatch(upsertPart(
    {...partForm, org_id: commonState.org_id}))
    res.then((resp) => {
      if(resp && resp.payload && resp.payload.success){
        toast.success("Part added successfully.");
        setDrawer(false);
        setPartForm(initialPartForm);
        setSelectedImage(null)
      } else toast.error("There was error adding this part please contact your technical team");
    });
}

  return (
    <Box>
       <ToastContainer />
      <Box
        display={"flex"}
        justifyContent="space-between"
        alignItems={"center"}
      >
        <Typography component="h2" variant="h6" color="primary" sx={{ mb: 2 }} >
          Manage Parts
        </Typography>
        <Box>
          <Button
            variant="outlined"
            style = {{ marginBottom : 25 }}
            startIcon={<AddIcon />}
            onClick={() => {
              setDrawer(true);
              setNewPart(true);
              setPartForm({...initialPartForm});
            }}
          >
            Add new part
          </Button>
        </Box>
      </Box>
      <EnhancedTable
        headCells={headCells}
        part={true}
        rows={partState.part_list}
        handleTableChange={(tableProps) => {
          console.log(tableProps);
        }}
        editButton={true}
        deleteButton={true}
        onEdit={(id, row) => {
          let partData = {...partForm}
          partData['id'] = row.id;
          partData['name'] = row.name;
          partData['description'] = row.description;
          partData['v_numbers'] = row.v_numbers;
          partData['station_value'] = row.station_id;

          setPartForm(partData);
          setDrawer(true);
          setNewPart(false);
        }}
        onDelete={(id) => {
         const res = dispatch(deletePart(
            {id:id, org_id: commonState.org_id}))
            res.then((resp) => {
              if(resp && resp.payload && resp.payload.success){
                toast.success("Part deleted successfully.");
              } else toast.error("There was error deleting this part please contact your technical team");
            });
        }}
      />
      <Drawer
        open={drawer}
        anchor="right"
        PaperProps={{ sx: { width: "500px" } }}
        onClose={() => {
          setDrawer(false);
          setPartForm(initialPartForm);
          setSelectedImage(null)
        }}
        variant={'temporary'}
      >
        <Box
          sx={{
            p: 2
          }}
        >
          <Typography variant="h5" sx={{ mb: 2 }}> {newPart ? 'Add new' : 'Edit'} part </Typography>

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
              id={partForm.name}
              label="Name"
              value={partForm.name}
              onChange={(e)=>{
                let partData = {...partForm}
                partData['name'] = e.target.value;
                setPartForm(partData);
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
              id={partForm.description}
              multiline
              rows={4}
              label="Part description"
              value={partForm.description}
              onChange={(e)=>{
                let partData = {...partForm}
                partData['description'] = e.target.value;
                setPartForm(partData);
              }}
              name="description"
              autoComplete="description"
              error={errors.description}
              helperText={errors?.description?.message}
              autoFocus
            />

            <TextField
              margin="normal"
              fullWidth
              id={partForm.v_numbers}
              multiline
              rows={4}
              label="Part vnumbers"
              placeholder="Please enter comma seperated vnumbers of this part"
              value={partForm.v_numbers}
              onChange={(e)=>{
                let partData = {...partForm}
                partData['v_numbers'] = e.target.value;
                setPartForm(partData);
              }}
              name="v_numbers"
              autoComplete="v_numbers"
              error={errors.v_numbers}
              helperText={errors?.v_numbers?.message}
              autoFocus
            />
            <AutocompleteCustom
              value={partForm?.station_value}
              style = {{ marginTop : 25 }}
              onChange={(newValue) => {
                let partData = {...partForm}

                partData['station_value'] = newValue;
                setPartForm(partData);
              }}
              id={'station'}
              options={stationState.station_list}
              fullWidth
              renderInput={(params) => <TextField {...params} label="Station" />}
            />


            {selectedImage ? (
              <div style={{ marginTop: '10' }}>
              <Button sx={{ mt: 3, mb: 2}} onClick={() => setSelectedImage(null)} variant="contained" component="label">
                 Remove Picture
               </Button>
               <div style={{ marginLeft: '10' }}>
                <img
                  alt="not found"
                  width={"250px"}
                  src={URL.createObjectURL(selectedImage)}
                />
                </div>
               </div>
                
            ): (<Button sx={{ mt: 3, mb: 2}} variant="contained" component="label">
                Upload Picture
                <input hidden accept="image/*" multiple type="file" onChange={(event) => {
                  console.log(event.target.files[0]);
                  setSelectedImage(event.target.files[0]);
                }} />
              </Button>)}

            
            <div>
            <Button
              type="submit"
              
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {newPart ? 'Submit' : 'Update'}
            </Button>
            <Button
              type="button"
              variant="contained"
              onClick={()=>{
                setDrawer(false)
                setPartForm({...initialPartForm})
                setSelectedImage(null)
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

export default PartsPage;
