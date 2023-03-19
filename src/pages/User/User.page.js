import { Box, Button, Drawer, FormControlLabel, Grid, TextField, Typography,Autocomplete } from "@mui/material";
import EnhancedTable from "components/Table";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import { getUsers, updateUser, createUser, deleteUser } from "redux/slices/userSlice";
import { getStationList } from "redux/slices/stationSlice";
import { toast } from 'react-toastify';

const schema = yup.object({
}).required();

const UserTypeOptions = [
  { value: 1, label: 'Admin' },
  { value: 2, label: 'Supervisor' },
  { value: 3, label: 'Operator' }
];

const initialUserForm = {
  id:'',
  first_name:'',
  last_name: '',
  user_name:'',
  password:'',
  user_type:'',
  user_type_value:'',
  station:'',
  station_value:''
};
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
    id: "user_type",
    numeric: false,
    disablePadding: true,
    label: "User type",
  },
  {
    id: "station",
    numeric: false,
    disablePadding: true,
    label: "Station",
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
  const [userForm, serUserForm] = useState(initialUserForm)
  const [userTypeInputValue, setUserTypeInputValue] = React.useState('');
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
  const commonState = useSelector(state => state.common);
  const userState = useSelector(state => state.user);

  React.useEffect(()=>{
    dispatch(getUsers(
      {org_id: commonState.org_id}))
      dispatch(getStationList(
        {org_id: commonState.org_id}))
}, [])

const onSubmit = ()=>{

  const upsertUser = userForm.id ? updateUser : createUser;
  dispatch(upsertUser(
    {user_details: userForm, org_id: commonState.org_id}))
    setDrawer(false);
    serUserForm(initialUserForm);
}

const openEditUserForm = (id, row) => {
  let userData = {...userForm}
  userData['id'] = id;
  userData['first_name'] = row.first_name;
  userData['last_name'] = row.last_name;
  userData['user_name'] = row.user_name;
  userData['user_type'] = row.user_type_value;
  userData['station'] = row.station_value;
 
  serUserForm(userData);
  setDrawer(true);
  setNewUser(false);
}

  return (
    <Box>
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
              serUserForm({...initialUserForm});
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
        handleTableChange={(tableProps) => {
          console.log(tableProps);
        }}
        editButton={true}
        deleteButton={true}
        onEdit={(id, row) => {
          openEditUserForm(id, row);
        }}
        onDelete={(id) => {
          dispatch(deleteUser(
            {id:id, org_id: commonState.org_id}))
        }}
      />
      <Drawer
        open={drawer}
        anchor="right"
        PaperProps={{ sx: { width: "500px" } }}
        onClose={() => {
          setDrawer(false);
          serUserForm(initialUserForm);
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
              margin="normal"
              required
              fullWidth
              id={userForm.first_name}
              label="First Name"
              value={userForm.first_name}
              onChange={(e)=>{
                let userData = {...userForm}
                userData['first_name'] = e.target.value;
                serUserForm(userData);
              }}
              name="first_name"
              autoComplete="first_name"
              error={errors.first_namefirst_name}
              helperText={errors?.first_name?.message}
              autoFocus
            />

            <TextField
              margin="normal"
              fullWidth
              id={userForm.last_name}
              label="Last Name"
              value={userForm.last_name}
              onChange={(e)=>{
                let userData = {...userForm}
                userData['last_name'] = e.target.value;
                serUserForm(userData);
              }}
              name="last_name"
              autoComplete="last_name"
              error={errors.last_name}
              helperText={errors?.last_name?.message}
              autoFocus
            />
            <TextField
              margin="normal"
              fullWidth
              id={userForm.user_name}
              label="Login User Name"
              value={userForm.user_name}
              onChange={(e)=>{
                let userData = {...userForm}
                userData['user_name'] = e.target.value;
                serUserForm(userData);
              }}
              name="user_name"
              autoComplete="user_name"
              error={errors.user_name}
              helperText={errors?.user_name?.message}
              autoFocus
            />
            <TextField
              margin="normal"
              fullWidth
              id={userForm.password}
              label="Password"
              value={userForm.password}
              onChange={(e)=>{
                let userData = {...userForm}
                userData['password'] = e.target.value;
                serUserForm(userData);
              }}
              name="password"
              autoComplete="password"
              error={errors.password}
              helperText={errors?.password?.message}
              autoFocus
            />
            <Autocomplete
              value={userForm.user_type_value}
              style = {{ marginTop : 20 }}
              onChange={(event, newValue) => {
                let userData = {...userForm}
                userData['user_type_value'] = newValue;
                serUserForm(userData);
              }}
              inputValue={userTypeInputValue}
              onInputChange={(event, newInputValue) => {
                setUserTypeInputValue(newInputValue);
              }}
              id="controllable-states-demo"
              options={UserTypeOptions}
              fullWidth
              renderInput={(params) => <TextField {...params} label="User Type" />}
            />

            <Autocomplete
              value={userForm.station_value}
              style = {{ marginTop : 25 }}
              onChange={(event, newValue) => {
                let userData = {...userForm}
                userData['station_value'] = newValue;
                serUserForm(userData);
              }}
              inputValue={stationInputValue}
              onInputChange={(event, newInputValue) => {
                setStationInputValue(newInputValue);
              }}
              id={userForm.station}
              options={stationState.station_list}
              fullWidth
              renderInput={(params) => <TextField {...params} label="Station" />}
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
                serUserForm({...initialUserForm})
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
