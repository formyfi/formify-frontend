import { Box, Button, Drawer, Typography } from "@mui/material";
import EnhancedTable from "components/Table";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";

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
        AAA
      </Drawer>
    </Box>
  );
};

export default StationPage;
