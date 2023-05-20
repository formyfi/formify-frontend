

import { Card } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import { getFullInseoctionsData} from "redux/slices/formSlice";
 
import { TextField } from "@mui/material";
import "@mui/material/styles";
import {useDispatch, useSelector} from "react-redux";

function BarChart() {

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

useEffect(()=>{
  const res = dispatch(getFullInseoctionsData({org_id: commonState.org_id, start_date: startOfWeek, end_date:endOfWeek}));
  res.then((resp) => {
    if (resp && resp.payload) {
      setTotalrecords(resp.payload.totalRecords)
    }
  })
},[])

useEffect(()=>{
  const res = dispatch(getFullInseoctionsData({org_id: commonState.org_id, start_date: startDate, end_date:endDate}));
  res.then((resp) => {
    if (resp && resp.payload) {
      setTotalrecords(resp.payload.totalRecords)
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
   let options = {
    title: {
        text: 'Total inspections done per day'
      },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
        xAxis: [
          {
            type: 'category',
            data: generateDateRange(startDate, endDate),
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'Direct',
            type: 'bar',
            barWidth: '60%',
            data: totalRecords
          }
        ]
      };

  return (
    <Card className="m-4">
      <Card.Body>
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
       
        <ReactECharts style={{ height: "400px" }} option={options} />
      </Card.Body>
    </Card>
  );
}

export default BarChart;