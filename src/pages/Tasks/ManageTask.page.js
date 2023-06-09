import {
  Box,
  Button,
  Drawer,
  Typography,
  TableCell,
  Chip,
  TextField,
} from "@mui/material";
import * as XLSX from 'xlsx';
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify';
import FormatAlignCenter from "@mui/icons-material/FormatAlignCenter";
import AdvanceTable from "components/AdvanceTable";
import FormSubmission from "./components/FormSubmission";
import { getTaskLists} from "redux/slices/formSlice";
import { saveAs } from "file-saver"; 

const ManageTask = () => {
  const [drawer, setDrawer] = useState(false);
  const [currentRecord, setRecord] = useState([]);
  const [formJson, setFormJson] = useState([]);
  const [formValue, setFormValue] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [openDialogue, setOpenDialogue] = React.useState(false);

  const dispatch = useDispatch();

  const commonState = useSelector((state) => state.common);
  const checkListState = useSelector((state) => state.checkList);

  React.useEffect(() => {
    setLoading(true);
   const res = dispatch(getTaskLists({org_id: commonState.org_id, user_id: commonState.user_id}));
   res.then(()=>setLoading(false))
  }, []);

  const handleClickOpen = () => {
    setOpenDialogue(true);
  };

  const handleClose = () => {
    setOpenDialogue(false);
  };

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

  // const handleDownload = () => {
  //   const data = checkListState.taskLists.filter(row => 
  //     row.part_name.toLowerCase().includes(searchValue.toLowerCase()) ||
  //     row.station_name.toLowerCase().includes(searchValue.toLowerCase()) ||
  //     row.form_id.toString().toLowerCase().includes(searchValue.toLowerCase()) ||
  //     row.vnum_id.toString().toLowerCase().includes(searchValue.toLowerCase())
  //   );
  
  //   // Get the headers of the CSV
  //   const headers = Object.keys(data[0]).filter(header => header !== 'form_data' && header !== 'form_json');
  
  //   // Create an array of the CSV rows
  //   const rows = data.map(obj => {
  //     return headers.map(header => {
  //     return obj[header];
  //     }).join(",");
  //     });     
  
  //   // Join the header row and the CSV rows
  //   const csvData = headers.join(",") + "\n" + rows.join("\n");
  
  //   // Convert CSV string to Blob
  //   const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
  
  //   // Save Blob as CSV file
  //   saveAs(blob, "checklist_data.csv");
  // };

  const handleDownload = () => {
    const data = checkListState.taskLists.filter(
      (row) =>
        row.part_name.toLowerCase().includes(searchValue.toLowerCase()) ||
        row.station_name.toLowerCase().includes(searchValue.toLowerCase()) ||
        row.form_id.toString().toLowerCase().includes(searchValue.toLowerCase()) ||
        row.vnum_id.toString().toLowerCase().includes(searchValue.toLowerCase())
    );
  
    const workbook = XLSX.utils.book_new();

    const main_headers = Object.keys(data[0]).filter(header => header !== 'form_data' && header !== 'form_json');
    const main_rows = data.map((obj) => {
      return main_headers.map((header) => {
        return obj[header];
      });
    });
    const worksheet = XLSX.utils.aoa_to_sheet([main_headers, ...main_rows]);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Completed Inspections');

    // Create a sheet for each unique form_id
    const formIds = [...new Set(data.map((row) => row.form_id))];
    formIds.forEach((formId) => {
      let sheetData = data.filter((row) => row.form_id === formId);
      const form_json = sheetData[0].form_json;
      if (form_json && form_json.length) {
        const headers = [];
        const rows = [];
  
        form_json.forEach((item) => {
          if (item.type !== 'header') {
            headers.push(item.label);
          }
        });
        sheetData.forEach((obj) => {
          const row = [];
          obj.form_json.forEach((value) => {
            if (value.type !== 'header') {
              row.push(value.field_value);
            }
          });
          rows.push(row);
        });
  
        const worksheet = XLSX.utils.aoa_to_sheet([headers, ...rows]);
        const name = 'Form: '+formId
        XLSX.utils.book_append_sheet(workbook, worksheet, name);
      }
    });
  
    // Convert workbook to Excel file
    const excelData = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  
    // Save Excel file
    const date = new Date().toJSON();
    const file_name = 'checklist_data_'+date+'.xlsx';
    saveAs(new Blob([excelData]), file_name);
  };
    
  
  

  const onGenerate = (record) => {
    setRecord(record);
    setFormJson(record.form_json);
    setFormValue(record.form_data);
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
    sx={{ width: "400px" }}
  >
      <Button
          color="primary"
          onClick={() => handleDownload()}
          sx={{ width: "400px" }}
        >
          Export Inspections
        </Button>
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
        data={checkListState.taskLists && checkListState.taskLists.filter(row => 
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
