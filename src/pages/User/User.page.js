import { Box, Button, Drawer, TextField, Typography,Autocomplete } from "@mui/material";
import EnhancedTable from "components/Table";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import { getUsers, updateUser, createUser, deleteUser } from "redux/slices/userSlice";
import { getStationList } from "redux/slices/stationSlice";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const schema = yup.object().shape({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  user_name: yup.string().email("Invalid email format").required("User name is required"),
  password: yup.string().required("Password is required"),
  station_value: yup.array().min(1, "At least one station is required"),
  functional_areas: yup.array().min(1, "At least one station is required"),
}).required();

const area_list = [
  {value: 1, label: 'User Management'},
  {value: 2, label: 'Operations'},
  {value: 3, label: 'Parts Management'},
  {value: 4, label: 'Forms management'},
  {value: 5, label: 'Inspections'},
  {value: 6, label: 'Reporting'}
];
const headCells = [
  {
    id: "id",
    numeric: true,
    disablePadding: false,
    label: "ID",
  },
  {
    id: "first_name",
    numeric: false,
    disablePadding: true,
    label: "First Name",
  },
  {
    id: "last_name",
    numeric: false,
    disablePadding: true,
    label: "Last Name",
  },
  {
    id: "user_name",
    numeric: false,
    disablePadding: true,
    label: "Login user name",
  },
  {
    id: "station_names",
    numeric: false,
    disablePadding: true,
    label: "Operations",
  },
  {
    id: "user_areas_names",
    numeric: false,
    disablePadding: true,
    label: "Functional Areas",
  },
  {
    id: "action",
    numeric: false,
    disablePadding: true,
    label: "Action",
  },
];

const UserPage = () => {
  const [drawer, setDrawer] = useState(false);
  const [newUser, setNewUser] = useState(false);
  const [areaOptions, setAreaOptions] = useState(area_list); // State to keep track of options in the Autocomplete
 
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    getValues
  } = useForm({
    resolver: yupResolver(schema)
  });
  
  const dispatch = useDispatch();
  const stationState = useSelector(state => state.station);
  const commonState = useSelector(state => state.common);
  const userState = useSelector(state => state.user);
  const [stationOptions, setStationOptions] = useState(stationState.station_list);
  React.useEffect(()=>{
    dispatch(getUsers(
      {org_id: commonState.org_id}))
      dispatch(getStationList(
        {org_id: commonState.org_id}))
}, [])

const onSubmit = () => {
  handleSubmit((formData) => {
    const upsertUser = formData.id ? updateUser : createUser;
    const res = dispatch(
      upsertUser({ user_details: formData, org_id: commonState.org_id })
    );
    res.then((resp) => {
      if (resp && resp.payload && resp.payload.success) {
        toast.success("User added successfully.");
        setDrawer(false);
        initializeForm();
      } else
        toast.error(
          "There was an error adding user, please contact your technical team"
        );
    });
  })();
};

const initializeForm = () => {
  setValue('id', '');
  setValue('first_name', '');
  setValue('last_name', '');
  setValue('user_name', '');
  setValue('password', '');
  setValue('station_value', []);
  setValue('functional_areas', []);
  setAreaOptions(area_list);
  setStationOptions(stationState.station_list)
}

const openEditUserForm = (id, row) => {

    setValue('id', row.id);
    setValue('first_name', row.first_name);
    setValue('last_name', row.last_name);
    setValue('user_name', row.user_name);
    if(stationState.station_list && stationState.station_list.length && row.station_id){
      let temp = row.station_id.split(',').map((t)=>parseInt(t));
      let station_values = stationState.station_list.filter((st)=>{
       return temp.includes(st.id);
     })
     setValue('station_value', station_values);
     setStationOptions(stationState.station_list.filter(st => !station_values.find(selectedSt => selectedSt.value === st.value)))
   } else setValue('station_value', []);
   if(row.user_areas){
    let temp = row.user_areas.split(',').map((t)=>parseInt(t));
    let functional_areas = area_list.filter((a)=>{
     return temp.includes(a.value);
   })
   setValue('functional_areas', functional_areas);
   setAreaOptions(area_list.filter(area => !functional_areas.find(selectedArea => selectedArea.value === area.value))) 
 } else setValue('functional_areas', []); 
    
    setAreaOptions(area_list);
    
   
    setDrawer(true);
    setNewUser(false);
}

  return (
    <Box>
      <ToastContainer />
      <Box
        display={"flex"}
        justifyContent="space-between"
        alignItems={"center"}
      >
        <Typography component="h2" variant="h6" color="primary" sx={{ mb: 2 }}>
          Manage Users
        </Typography>
        <Box>
          <Button
            variant="outlined"
            style = {{ marginBottom : 25 }}
            startIcon={<AddIcon />}
            onClick={() => {
              setDrawer(true);
              setNewUser(true);
              initializeForm();
            }}
          >
            Add new user
          </Button>
        </Box>
      </Box>
      <EnhancedTable
        headCells={headCells}
        user={true}
        rows={userState.user_list}
        loading={userState.user_list && userState.user_list.length ? false : true}
        handleTableChange={(tableProps) => {
          console.log(tableProps);
        }}
        editButton={true}
        deleteButton={true}
        onEdit={(id, row) => {
          openEditUserForm(id, row);
        }}
        onDelete={(id) => {
         const res =  dispatch(deleteUser(
            {id:id, org_id: commonState.org_id}))
            res.then((resp) => {
              if(resp && resp.payload && resp.payload.success){
                toast.success("User deleted successfully.");
              } else toast.error("There was error deleting user, please contact your technical team");
            });
        }}
      />
      <Drawer
        open={drawer}
        anchor="right"
        PaperProps={{ sx: { width: "500px" } }}
        onClose={() => {
          setDrawer(false);
          initializeForm()
        }}
        variant={'temporary'}
      >
        <Box
          sx={{
            p: 2
          }}
        >
          <Typography variant="h5" sx={{ mb: 2 }}> {newUser ? 'Add new' : 'Edit'} user </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              label="First Name"
              fullWidth
              margin="normal"
              {...register("first_name")} // register the field
              error={!!errors.first_name} // check if there's an error for the field
              helperText={errors.first_name?.message} // display the error message
            />

            <TextField
              label="Last Name"
              fullWidth
              margin="normal"
              {...register("last_name")}
              error={!!errors.last_name}
              helperText={errors.last_name?.message}
            />
            <TextField
              label="User Name"
              fullWidth
              margin="normal"
              {...register("user_name")}
              error={!!errors.user_name}
              helperText={errors.user_name?.message}
            />
           <TextField
            label="Password"
            fullWidth
            margin="normal"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            />
            <Autocomplete
              style = {{ marginTop : 25 }}
              {...register('station_value')}
              value={getValues('station_value')}
              onChange={(e,selected)=>{
                setValue('station_value',selected,{
                  shouldValidate: true,
                  shouldTouch: true,
                  shouldDirty: true
                })
                setStationOptions(stationState.station_list.filter(st => !selected.find(selectedSt => selectedSt.value === st.value)))
              }}
              multiple={true}
              id={'station'}
              options={stationOptions}
              fullWidth
              renderInput={(params) => <TextField {...params} label={"Operations"} />}
            />
            <Autocomplete
              style = {{ marginTop : 25 }}
              {...register('functional_areas')}
              value={getValues('functional_areas')}
              onChange={(e,selected)=>{
                setValue('functional_areas',selected,{
                  shouldValidate: true,
                  shouldTouch: true,
                  shouldDirty: true
                })
                setAreaOptions(area_list.filter(area => !selected.find(selectedArea => selectedArea.value === area.value))) 
              }}
              multiple={true}
              id={'area_list'}
              options={areaOptions}
              fullWidth
              renderInput={(params) => <TextField {...params} label={"Functional Area"} />}
            />
            <div>
            <Button
              type="submit"
              
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {newUser ? 'Submit' : 'Update'}
            </Button>
            <Button
              type="button"
              variant="contained"
              onClick={()=>{
                setDrawer(false)
                initializeForm()
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

export default UserPage;
