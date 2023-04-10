import {
  Box,
  Button,
  Drawer,
  Typography,
  TableCell,
  Chip,
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
  const dispatch = useDispatch();

  const commonState = useSelector((state) => state.common);
  const checkListState = useSelector((state) => state.checkList);

  React.useEffect(() => {
    dispatch(getTaskLists({org_id: commonState.org_id, user_id: commonState.user_id}));
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
              variant="outlined"
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
        display={"flex"}
        justifyContent="space-between"
        alignItems={"center"}
      >
        <Typography component="h2" variant="h6" color="primary" sx={{mb: 2}}>
          Completed Inspections
        </Typography>
      </Box>
      <AdvanceTable
        headCells={headCells}
        user={true}
        rows={checkListState.taskLists}
        loading={checkListState.taskLists && checkListState.taskLists.length ? false : true}
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
