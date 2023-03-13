import { Box, Button, Drawer, FormControlLabel, Grid, TextField, Typography } from "@mui/material";
import EnhancedTable from "components/Table";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
  // email: yup.string().required(),
}).required();

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
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema)
  });
  
  const onSubmit = ()=>{

  }

  return (
    <Box>
      <Box
        display={"flex"}
        justifyContent="space-between"
        alignItems={"center"}
      >
        <Typography variant="h4" sx={{ mb: 2 }} component="h2">
          Manage Station
        </Typography>
        <Box>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={() => {
              setDrawer(true);
            }}
          >
            Add
          </Button>
        </Box>
      </Box>
      <EnhancedTable
        headCells={headCells}
        rows={[
          {
            id: 1,
            name: "Hello",
            type: "Test",
          },
        ]}
        handleTableChange={(tableProps) => {
          console.log(tableProps);
        }}
        editButton={true}
        deleteButton={true}
        onEdit={(id, row) => {
          setDrawer(true);
        }}
        onDelete={(id, row) => {
          setDrawer(true);
        }}
      />
      <Drawer
        open={drawer}
        anchor="right"
        PaperProps={{ sx: { width: "500px" } }}
        onClose={() => {
          setDrawer(false);
        }}
      >
        <Box
          sx={{
            p: 2
          }}
        >
          <Typography variant="h4" sx={{ mb: 2 }} component="h2"> Add Station </Typography>

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
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              {...register("name")}
              error={errors.name}
              helperText={errors?.name?.message}
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};

export default StationPage;
