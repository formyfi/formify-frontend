import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import { getFullInseoctionsData} from "redux/slices/formSlice";
import { saveAs } from "file-saver"; 
import { Box, Button, TextField } from "@mui/material";
import "@mui/material/styles";
import {useDispatch, useSelector} from "react-redux";

function StackedBarChart() {
  const commonState = useSelector((state) => state.common);

  const dispatch = useDispatch();
  const currentDate = new Date();
  const startOfWeek = new Date(
    currentDate.setDate(currentDate.getDate() - currentDate.getDay())
  );
  const endOfWeek = new Date(
    currentDate.setDate(currentDate.getDate() + 6)
  );

  const [startDate, setStartDate] = useState(startOfWeek);
  const [endDate, setEndDate] = useState(endOfWeek);
  const [totalRecords, setTotalrecords] = useState([]);
  const [compliantRecords, setCompliantRecords] = useState([]);
  const [nonCompliantRecords, setnonCompliantRecords] = useState([]);

useEffect(()=>{
  const res = dispatch(getFullInseoctionsData({org_id: commonState.org_id, start_date: startOfWeek, end_date:endOfWeek}));
  res.then((resp) => {
    if (resp && resp.payload) {
      setTotalrecords(resp.payload.totalRecords)
      setCompliantRecords(resp.payload.compliantRecords)
      setnonCompliantRecords(resp.payload.nonCompliantRecords)
    }
  })
},[])

useEffect(()=>{
  const res = dispatch(getFullInseoctionsData({org_id: commonState.org_id, start_date: startDate, end_date:endDate}));
  res.then((resp) => {
    if (resp && resp.payload) {
      setTotalrecords(resp.payload.totalRecords)
      setCompliantRecords(resp.payload.compliantRecords)
      setnonCompliantRecords(resp.payload.nonCompliantRecords)
    }
  })
  
},[endDate,startDate])

const handleDateRangeChange = (event) => {
  const { name, value } = event.target;
  if (name === "start") {
    setStartDate(new Date(value));
  } else if (name === "end") {
    setEndDate(new Date(value));
  }
};


const generateDateRange = (start, end) => {
  const dateRange = [];
  const currentDate = new Date(start);

  while (currentDate <= end) {
    const formattedDate = currentDate.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
    });
    dateRange.push(formattedDate);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dateRange;
};

const handleResetWeek = () => {
  setStartDate(null);
  setEndDate(null);
  
};
;


  let options = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {},
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
            feature: {
              saveAsImage: {},
              dataView: {},
            }
          },
          xAxis: [
            {
              type: "category",
              data: generateDateRange(startDate, endDate),
            },
          ],          
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'Total',
            type: 'bar',
            emphasis: {
              focus: 'series'
            },
            data: totalRecords
          },
          {
            name: 'Compliant',
            type: 'bar',
            stack: 'Ad',
            emphasis: {
              focus: 'series'
            },
            data: compliantRecords
          },
          {
            name: 'Non Compliant',
            type: 'bar',
            stack: 'Ad',
            emphasis: {
              focus: 'series'
            },
            data: nonCompliantRecords
          },
          
        ]
      }
      const handleDownload = () => {
        const categories = options.xAxis[0].data;
        const seriesData = options.series.map(serie => serie.data);
        
        const csvData = categories.reduce((acc, category, index) => {
          acc[category] = seriesData.map(serie => serie[index]);
          return acc;
        }, {});
        
        // Convert object to CSV string
        const csvString = Object.keys(csvData).join(',') + '\n' +
          Object.values(csvData).map(row => row.join(',')).join('\n');
        
        // Convert CSV string to Blob
        const blob = new Blob([csvString], { type: "text/csv;charset=utf-8" });
        
        // Save Blob as CSV file
        saveAs(blob, "chart_data.csv");
      };
  return (
    <Box>
        <TextField
        label="Start Date"
        type="date"
        name="start"
        value={startDate ? startDate.toISOString().slice(0, 10) : ""}
        onChange={handleDateRangeChange}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="End Date"
        type="date"
        name="end"
        value={endDate ? endDate.toISOString().slice(0, 10) : ""}
        onChange={handleDateRangeChange}
        InputLabelProps={{
          shrink: true,
        }}
      />
        <Button
          color="primary"
          onClick={handleDownload}
          
        >
          Export
        </Button>

        <ReactECharts option={options} style={{ height: "400px" }}/>
        </Box>
  );
}

export default StackedBarChart;