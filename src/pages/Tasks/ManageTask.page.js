import {
  Box,
  Button,
  Drawer,
  Typography,
  TableCell,
  Chip,
  TextField,
} from "@mui/material";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify';
import FormatAlignCenter from "@mui/icons-material/FormatAlignCenter";
import AdvanceTable from "components/AdvanceTable";
import FormSubmission from "./components/FormSubmission";
import { getTaskLists} from "redux/slices/formSlice";


const ManageTask = () => {
  const [drawer, setDrawer] = useState(false);
  const [currentRecord, setRecord] = useState([]);
  const [formJson, setFormJson] = useState([]);
  const [formValue, setFormValue] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const commonState = useSelector((state) => state.common);
  const checkListState = useSelector((state) => state.checkList);

  React.useEffect(() => {
    setLoading(true);
   const res = dispatch(getTaskLists({org_id: commonState.org_id, user_id: commonState.user_id}));
   res.then(()=>setLoading(false))
  }, []);

  const headCells = [
    {
      id: "vnum_id",
      numeric: false,
      label: "Part Serial#",
    },
    {
      id: "part_name",
      numeric: false,
      label: "Part",
    },
    {
      id: "station_name",
      numeric: false,
      label: "Operation",
    },
    {
      id: "form_id",
      numeric: false,
      label: "Form ID",
    },
    {
      id: "compliance_ind",
      numeric: false,
      label: "Compliant",
      render: (record) => {
        return (
          <TableCell align="left">
            {record.compliance_ind === 'No' ? <Chip label={record.compliance_ind} color='error'  />
            : <Chip label={record.compliance_ind} color='success' />}
          </TableCell>
        );
      },
    },
    {
      id: "action",
      numeric: false,
      label: "Action",
      render: (record) => {
        return (
          <TableCell align="left">
            <Button
              onClick={() => onGenerate(record)}
              startIcon={<FormatAlignCenter />}
            >
              View Inspection
            </Button>
          </TableCell>
        );
      },
    },
  ];

  const onGenerate = (record) => {
    setRecord(record);
    setFormJson(JSON.parse(record.form_json));
    setFormValue(JSON.parse(record.form_data));
    setDrawer(true);
  };

  return (
    <Box>
      <ToastContainer />
      <Box
  display="flex"
  justifyContent="space-between" // Update justifyContent to "space-between"
  alignItems="center"
>
  <Typography component="h2" variant="h6" color="primary" sx={{ mb: 2 }}>
    Completed Inspections
  </Typography>
  <Box // Wrap the TextField component in a Box component
    display="flex"
    justifyContent="flex-end"
    alignItems="center"
    mb={2}
    sx={{ width: "300px" }}
  >
    <TextField
      id="search"
      label="Search"
      name="name"
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      autoComplete="search"
      InputProps={{ disableUnderline: true }}
      autoFocus
      fullWidth
    />
  </Box>
</Box>
      <AdvanceTable
        headCells={headCells}
        user={true}
        data={checkListState.taskLists.filter(row => 
          row.part_name.toLowerCase().includes(searchValue.toLowerCase()) ||
          row.station_name.toLowerCase().includes(searchValue.toLowerCase()) ||
          row.form_id.toString().toLowerCase().includes(searchValue.toLowerCase()) ||
          row.vnum_id.toString().toLowerCase().includes(searchValue.toLowerCase())
        )}
        loading={loading}
        handleTableChange={(tableProps) => {
          console.log(tableProps);
        }}
      />
      <Drawer
        open={drawer}
        anchor="right"
        PaperProps={{sx: {width: "700px"}}}
        onClose={() => {
          setDrawer(false);
        }}
        variant={"temporary"}
      >
        <FormSubmission
          stationValue={currentRecord.station_id}
          partValue={currentRecord.part_id}
          vnumberValue={currentRecord.vnum_id}
          form_json={formJson}
          form_value={formValue}
          handleBack={() => {
            setDrawer(false)
            setRecord([]);
          }}
        />
      </Drawer>
    </Box>
  );
};

export default ManageTask;
