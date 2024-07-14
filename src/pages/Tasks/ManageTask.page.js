import {
  Box,
  Button,
  Drawer,
  Typography,
  TableCell,
  Chip,
  Divider,
  TablePagination,
  Collapse,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import * as XLSX from "xlsx";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import FormatAlignCenter from "@mui/icons-material/FormatAlignCenter";
import AdvanceTable from "components/AdvanceTable";
import FormSubmission from "./components/FormSubmission";
import { getAllTaskLists, getTaskLists, getTaskListsToDownload, unlockForm } from "redux/slices/formSlice";
import { saveAs } from "file-saver";

const ManageTask = () => {
  const [drawer, setDrawer] = useState(false);
  const [currentRecord, setRecord] = useState([]);
  const [formJson, setFormJson] = useState([]);
  const [formValue, setFormValue] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [openDialogue, setOpenDialogue] = React.useState(false);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [filterVisible, setFilterVisible] = useState(false);
  const [exportCollapse, setExportCollapse] = useState(false);
  const [filters, setFilters] = useState({
      part_name: "",
      station_name: "",
      form_name: "",
      compliance_ind: "",
  });
  const [exportFilters, setExportFilters] = useState({
    part_name: "",
    station_name: "",
  })

  const dispatch = useDispatch();

  const commonState = useSelector((state) => state.common);
  const checkListState = useSelector((state) => state.checkList);

  React.useEffect(() => {
    fetchRecords({
      optionlimit: limit,
      optionPage: page,
    });
  }, []);

  const handleFilterToggle = () => {
    setFilterVisible(!filterVisible);
    setExportCollapse(false);
  };

  const handleExportToggle = () => {
    setExportCollapse(!exportCollapse);
    setFilterVisible(false);
  };

  const handleExportFilterChange = (event) => {
    const { name, value } = event.target;
    setExportFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const fetchFilteredRecords = () => {
    console.log('Fetching records with filters:', filters);
    setLoading(true);
    const res = dispatch(
      getTaskLists({
        org_id: commonState.org_id,
        user_id: commonState.user_id,
        perPage: limit,
        page: page + 1,
        searchText: searchValue,
        filters: filters
      })
    );
    res.then((res) => {
      setLoading(false);
      setFilterVisible(false);
      const apiRes = res?.payload;
      if (apiRes?.total_records) {
        setTotal(apiRes?.total_records);
      }
    });
  };

  const uniqueValues = (key) => {
    const items = checkListState.taskLists.map(item => item[key]);
    return [...new Set(items)].filter(Boolean); // This will remove any undefined or null values
  };

  const fetchRecords = ({ optionlimit, optionPage, searchValue }) => {
    setLoading(true);
    const res = dispatch(
      getTaskLists({
        org_id: commonState.org_id,
        user_id: commonState.user_id,
        perPage: optionlimit,
        page: optionPage + 1,
        searchText: searchValue,
      })
    );
    res.then((res) => {
      setLoading(false);
      console.log(res);
      const apiRes = res?.payload;
      if (apiRes?.total_records) {
        setTotal(apiRes?.total_records);
      }
    });
  };

  const fetchAllValues = async ({ optionPage = 0, records = [] }) => {
    const res = await dispatch(
      getAllTaskLists({
        org_id: commonState.org_id,
        user_id: commonState.user_id,
        perPage: 1000,
        page: optionPage,
      })
    );
    if (res && res?.payload) {
      const apiRes = res?.payload;
      if (apiRes?.total_records) {
        let totalPage = Math.ceil(apiRes?.total_records / 1000);
        if (totalPage === optionPage) {
          // stopppp
          return [...records, ...apiRes.task_lists];
        } else {
          fetchAllValues({
            optionPage: optionPage + 1,
            hasMore: true,
            records: [...records, ...apiRes.task_lists],
          });
        }
      }
    }
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
      id: "form_name",
      numeric: false,
      label: "Form Name",
    },
    {
      id: "compliance_ind",
      numeric: false,
      label: "Compliant",
      render: (record) => {
        return (
          <TableCell align="left">
            {record.compliance_ind === "No" ? (
              <Chip label={record.compliance_ind} color="error" />
            ) : (
              <Chip label={record.compliance_ind} color="success" />
            )}
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

  useEffect(() => {
    // Create a timeout variable to store the timer ID
    let timeoutId;

    // Define the delay time for debouncing (e.g., 500 milliseconds)
    const delay = 500;

    // Create a function to handle the actual search logic
    const searchFunction = (value) => {
      if (value && String(value).trim() != "")
        fetchRecords({
          optionlimit: limit,
          optionPage: page,
          searchValue: value,
        });
    };

    // Function to handle debouncing
    const handleDebounce = (value) => {
      // Clear any existing timeout to avoid duplicate calls
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      // Set a new timeout to execute the search function after the delay
      timeoutId = setTimeout(() => {
        searchFunction(value ? value : "");
      }, delay);
    };

    // Call the debounce function whenever the searchValue changes
    handleDebounce(searchValue);

    // Clean up the timeout on unmount to avoid any potential memory leaks
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [searchValue]);

  // Strip HTML function
  const stripHtml = (htmlString) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = htmlString;
    return tmp.textContent || tmp.innerText || "";
  }

  const handleDownload = async (type) => {
    let f = {
      part_name: exportFilters.part_name,
      station_name: exportFilters.station_name
    }
    const res = await dispatch(getTaskListsToDownload({
      org_id: commonState.org_id,
      user_id: commonState.user_id,
      perPage: 10000, // Assume you want to fetch all or a large number of records
      page: 1,
      filters: type === 'full' ? null : f
    }));

    if (res.payload && res.payload.task_lists) {
        const filteredData = res.payload.task_lists;
        exportToExcel(filteredData);
        const data = filteredData.filter((item) =>
        (exportFilters.part_name === "" || item.part_name === exportFilters.part_name) &&
        (exportFilters.station_name === "" || item.station_name === exportFilters.station_name)
      );
      exportToExcel(data);
    } else {
        // Handle the case where no data is returned or there are errors
        toast.error("There is no data to download.");
    }
     // Close the export collapse after download
  };

  const exportToExcel = (data) => {

    const workbook = XLSX.utils.book_new();  
    const main_headers = Object.keys(data[0]).filter(
      (header) => header !== "form_data" && header !== "form_json"
    );
  
    const main_rows = data.map((obj) => {
      return main_headers.map((header) => {
        return obj[header];
      });
    });
  
    const worksheet = XLSX.utils.aoa_to_sheet([main_headers, ...main_rows]);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Completed Inspections");
  
    // Create a sheet for each unique form_name
    const formIds = [...new Set(data.map((row) => row.form_name))];
    formIds.forEach((formId) => {
      let sheetData = data.filter((row) => row.form_name === formId);
      const form_json = sheetData[0].form_json;
      if (form_json && form_json.length) {
        const headers = [];
        const rows = [];
        form_json.forEach((item) => {
          if (item.type !== "header" && item.type !== "br") {
            headers.push(stripHtml(item.label));
          }
        });
  
        sheetData.forEach((obj) => {
          const row = [];
          obj.form_json.forEach((value) => {
            if (value.type !== "header") {
              row.push(stripHtml(value.field_value));
            }
          });
          rows.push(row);
        });
  
        const worksheet = XLSX.utils.aoa_to_sheet([headers, ...rows]);
        const name = "Form: " + formId;
        XLSX.utils.book_append_sheet(workbook, worksheet, name);
      }
    });
  
    // Convert workbook to Excel file
    const excelData = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  
    // Save Excel file
    const date = new Date().toJSON();
    const file_name = "checklist_data_" + date + ".xlsx";
    saveAs(new Blob([excelData]), file_name);
    setExportCollapse(false);
  };

  const onGenerate = (record) => {
    setRecord(record);
    setFormJson(record.form_json);
    setFormValue(record.form_data);
    setDrawer(true);
  };
  
  const handleResetFilters = () => {
    setFilters({
      part_name: "",
      station_name: "",
      form_name: "",
      compliance_ind: "",
    });
    setLoading(true);
    const res = dispatch(
      getTaskLists({
        org_id: commonState.org_id,
        user_id: commonState.user_id,
        perPage: limit,
        page: page + 1,
        searchText: searchValue,
      })
    );
    res.then((res) => {
      setLoading(false);
      setFilterVisible(false);
      const apiRes = res?.payload;
      if (apiRes?.total_records) {
        setTotal(apiRes?.total_records);
      }
    });
  }

  
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
          mb={3}
          sx={{ width: "400px" }}
        >
          <Button
            color="primary"
            onClick={handleExportToggle}
            sx={{ width: "100px" }}
          >
            Export
          </Button>
          <Button sx={{ width: "100px" }} color="primary" onClick={handleFilterToggle}>
            Filter
          </Button>
          {/* <TextField
            id="search"
            label="Search"
            name="name"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            autoComplete="search"
            InputProps={{ disableUnderline: true }}
            autoFocus
            fullWidth
          /> */}
        </Box>
      </Box>
      <Collapse in={filterVisible} sx={{ mt: 2 }}>
        <Box display="flex" gap={2} mb={2}>
          {['part_name', 'station_name', 'form_name', 'compliance_ind'].map((key) => {
            let label;
            if (key === 'part_name') label = 'Part';
            else if (key === 'station_name') label = 'Operation';
            else if (key === 'form_name') label = 'Form';
            else if (key === 'compliance_ind') label = 'Compliance';

            return (
              <Box key={key} sx={{ width: "300px" }}>
                <FormControl fullWidth>
                  <InputLabel>{label}</InputLabel>
                  <Select
                    value={filters[key]}
                    name={key}
                    onChange={handleFilterChange}
                    label={label}
                    variant={'standard'}
                  >
                    <MenuItem value="">None</MenuItem>  {/* Option to clear the select */}
                    {uniqueValues(key).map((value) => (
                      <MenuItem value={value} key={value}>
                        {value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {/* <Button 
                  variant="outlined" 
                  onClick={() => handleClear(key)}
                  sx={{ ml: 1, mt: 1 }}
                >
                  Clear
                </Button> */}
              </Box>
            );
          })}
          <Button variant="text" onClick={fetchFilteredRecords} sx={{ height: '56px' }}>
            Apply
          </Button>
          <Button variant="text" onClick={handleResetFilters} sx={{ height: '56px' }}>
            Reset
          </Button>
        </Box>
      </Collapse>

      <Collapse in={exportCollapse}>
        <Box display="flex" gap={2} mb={2} >
          {['part_name', 'station_name'].map((key) => {
            let label = key === 'part_name' ? 'Part' : 'Operation';
            return (
              <FormControl fullWidth key={key} sx={{ width: "400px" }}>
                <InputLabel>{label}</InputLabel>
                <Select
                  value={exportFilters[key]}
                  name={key}
                  onChange={handleExportFilterChange}
                  label={label}
                >
                  <MenuItem value="">None</MenuItem>
                  {uniqueValues(key).map((value) => (
                    <MenuItem value={value} key={value}>{value}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            );
          })}
          <Button variant="text" onClick={handleDownload} sx={{ width: '100px' }}>
            Download
          </Button>
          <Button variant="text" onClick={()=>handleDownload('all')} sx={{ width: '150px' }}>
            Download All
          </Button>
        </Box>
      </Collapse>
      <Box mt={2}>
        <AdvanceTable
          headCells={headCells}
          pagination={false}
          user={true}
          data={checkListState.taskLists}
          loading={loading}
          limit={limit}
          handleTableChange={(tableProps) => {
            console.log(tableProps);
          }}
        />
      </Box>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={total}
        rowsPerPage={limit}
        page={page}
        onPageChange={(_, cpage) => {
          setPage(cpage);
          fetchRecords({
            optionlimit: limit,
            optionPage: cpage,
            searchText: searchValue,
          });
        }}
        onRowsPerPageChange={(_) => {
          setLimit(_?.target?.value);

          fetchRecords({
            optionlimit: _?.target?.value,
            optionPage: page,
            searchText: searchValue,
          });
        }}
      />
      <Drawer
        open={drawer}
        anchor="right"
        PaperProps={{ sx: { width: "700px" } }}
        onClose={() => {
          setDrawer(false);
          dispatch(unlockForm());
        }}
        variant={"temporary"}
      >
        <FormSubmission
          stationValue={currentRecord.station_id}
          partValue={currentRecord.part_id}
          vnumberValue={currentRecord.vnum_id}
          form_json={formJson}
          form_value={formValue}
          view={'completed_inspections'}
          handleBack={() => {
            setDrawer(false);
            dispatch(unlockForm());
            setRecord([]);
          }}
        />
      </Drawer>
    </Box>
  );
};

export default ManageTask;
