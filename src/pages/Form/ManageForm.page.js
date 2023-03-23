import {
  Box,
  Button,
  Drawer,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
  Autocomplete,
  TableCell,
} from "@mui/material";
import EnhancedTable from "components/Table";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  getUsers,
  updateUser,
  createUser,
  deleteUser,
} from "redux/slices/userSlice";
import { getStationList } from "redux/slices/stationSlice";
import { toast } from "react-toastify";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FormatAlignCenter from "@mui/icons-material/FormatAlignCenter";
import AdvanceTable from "components/AdvanceTable";
import { createCheckListAction, getCheckLists } from "redux/slices/formSlice";
import { getPartList } from "redux/slices/partSlice";

const schema = yup
  .object({
    title: yup.string().required(),
    station_id: yup.string().required(),
    part: yup.string().required(),
  })
  .required();


const initialUserForm = {
  id: "",
  first_name: "",
  last_name: "",
  user_name: "",
  password: "",
  user_type: "",
  user_type_value: "",
  station: "",
  station_value: "",
};

const ManageForm = () => {
  const [drawer, setDrawer] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    getValues,
    formState: { errors, },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();
  const stationState = useSelector((state) => state.station);
  const partStates = useSelector((state) => state.part);
  const commonState = useSelector((state) => state.common);
  const checkListState = useSelector((state) => state.checkList);

  React.useEffect(() => {
    dispatch(getCheckLists({ org_id: commonState.org_id }));
    dispatch(getStationList({ org_id: commonState.org_id }));
    dispatch(getPartList({ org_id: commonState.org_id }));
  }, []);

  const onSubmit = (values) => {
    console.log(values);
    dispatch(createCheckListAction({ ...values, org_id: commonState.org_id }));
    setDrawer(false);
  };

  const headCells = [
    {
      id: "id",
      numeric: true,
      label: "ID",
    },
    {
      id: "title",
      numeric: false,
      label: "Title",
    },
    {
      id: "station_name",
      numeric: false,
      disablePadding: true,
      label: "Station",
    },
    {
      id: "part_name",
      numeric: false,
      label: "Part",
    },
    {
      id: "form",
      numeric: false,
      label: "Form Generated",
    },
    {
      id: "action",
      numeric: false,
      label: "Action",
      render: (record) => {
        return (
          <TableCell align="left">
            <Button
              variant="outlined"
              onClick={onGenerate}
              startIcon={<FormatAlignCenter />}
            >
              Generate form
            </Button>
            <Button
              variant="outlined"
              onClick={()=>{
                onEdit(record)
              }}
              sx={{ mx: 2 }}
              startIcon={<EditIcon />}
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              onClick={onGenerate}
              color="error"
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          </TableCell>
        );
      },
    },
  ];

  const onEdit = (record) => {
      setDrawer(true);
      setIsEdit(true);
      setValue('title',record?.title);
      setValue('id',record?.id);
      setValue('station',record?.station_id);
      setValue('part',record?.part_id);
      setValue('station_name',record?.station_name);
      setValue('part_name',record?.part_name);
  };

  const onDelete = () => {};

  const onGenerate = () => {};

  return (
    <Box>
      <Box
        display={"flex"}
        justifyContent="space-between"
        alignItems={"center"}
      >
        <Typography component="h2" variant="h6" color="primary" sx={{ mb: 2 }}>
          Manage CheckLists
        </Typography>
        <Box>
          <Button
            variant="outlined"
            style={{ marginBottom: 25 }}
            startIcon={<AddIcon />}
            onClick={() => {
              setDrawer(true);
              setIsEdit(false);
            }}
          >
            Add CheckList
          </Button>
        </Box>
      </Box>
      <AdvanceTable
        headCells={headCells}
        user={true}
        rows={checkListState.listData}
        handleTableChange={(tableProps) => {
          console.log(tableProps);
        }}
      />
      <Drawer
        open={drawer}
        anchor="right"
        PaperProps={{ sx: { width: "500px" } }}
        onClose={() => {
          setDrawer(false);
          reset()
        }}
        variant={"temporary"}
      >
        <Box
          sx={{
            p: 2,
          }}
        >
          <Typography variant="h5" sx={{ mb: 2 }}>
            {" "}
            {!isEdit ? "Add " : "Edit"} CheckList
          </Typography>
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
              {...register("title")}
              label="Title"
              error={errors.title?.message}
              helperText={errors.title?.message}
              autoFocus
            />
            <Autocomplete
              style={{ marginTop: 25 }}
              options={stationState.station_list}
              value={getValues('station_name')}
              fullWidth
              {...register("station_id")}
              onChange={(e,selected)=>{
                setValue('station_id',selected.id,{
                  shouldValidate: true,
                  shouldTouch: true,
                  shouldDirty: true
                })
                setValue('station_name',selected.name,{
                  shouldValidate: true,
                  shouldTouch: true,
                  shouldDirty: true
                })
              }}
              option
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Station"
                  error={errors.station?.message}
                  helperText={errors.station?.message}
                />
              )}
            />
            <Autocomplete
              style={{ marginTop: 25 }}
              id="controllable-states-demo"
              options={partStates.part_list}
              value={getValues('part_name')}
              {...register("part")}
              onChange={(e,selected)=>{
                
                setValue('part',selected.id, {
                  shouldValidate: true,
                  shouldTouch: true,
                  shouldDirty: true
                })
                setValue('part_name',selected.name, {
                  shouldValidate: true,
                  shouldTouch: true,
                  shouldDirty: true
                })
                
              }}
              fullWidth
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Part"
                  error={errors.part?.message}
                  helperText={errors.part?.message}
                />
              )}
            />
            <div>
              <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                {!isEdit ? "Submit" : "Update"}
              </Button>
              <Button
                type="button"
                variant="contained"
                onClick={() => {
                  setDrawer(false);
                }}
                sx={{ mt: 3, mb: 2, ml: 2 }}
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

export default ManageForm;
