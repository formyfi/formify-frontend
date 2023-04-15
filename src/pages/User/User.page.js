import { Box, Button, Drawer, FormControlLabel, Grid, TextField, Typography,Autocomplete, InputAdornment, IconButton } from "@mui/material";
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
import { AutocompleteCustom, AutocompleteCustomMulti } from "components/AutocompleteCustom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const schema = yup.object().shape({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  user_name: yup.string().email("Invalid email format").required("User name is required"),
  password: yup.string().required("Password is required"),
  station_value: yup.array().min(1, "At least one station is required"),
}).required();

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
    id: "action",
    numeric: false,
    disablePadding: true,
    label: "Action",
  },
];

const UserPage = () => {
  const [drawer, setDrawer] = useState(false);
  const [newUser, setNewUser] = useState(false);
  const [userTypeInputValue, setUserTypeInputValue] = React.useState('');
  const [stationInputValue, setStationInputValue] = React.useState('');
  const [showPassword, setShowPassword] = useState(false);


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
}

const openEditUserForm = (id, row) => {

    setValue('id', row.id);
    setValue('first_name', row.first_name);
    setValue('last_name', row.last_name);
    setValue('user_name', row.user_name);
    if(stationState.station_list && stationState.station_list.length && row.station_id){
      let station_values = stationState.station_list.filter((st)=>{
       let temp = row.station_id.split(',').map((t)=>parseInt(t));
       return temp.includes(st.id);
     })
     setValue('station_value', station_values);
   } else setValue('station_value', row.station_id);
    
   
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
              }}
              multiple={true}
              id={'station'}
              options={stationState.station_list}
              fullWidth
              renderInput={(params) => <TextField {...params} label={"Operations"} />}
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
