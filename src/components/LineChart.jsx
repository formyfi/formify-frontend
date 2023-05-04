import React from "react";
import ReactECharts from "echarts-for-react";
import Loader from "./Loader";
import { Card } from "react-bootstrap";

function LineChart() {
    let options = {
    title: {
      text: ''
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['Laser Cutting', 'Plasma Cutting', 'Turning', 'Turning', 'Milling']
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
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Laser Cutting',
        type: 'line',
        stack: 'Total',
        data: [7, 5, 6, 8, 9, 8, 4]
      },
      {
        name: 'Plasma Cutting',
        type: 'line',
        stack: 'Total',
        data: [6, 8, 5, 4, 7, 6, 7]
      },
      {
        name: 'Turning',
        type: 'line',
        stack: 'Total',
        data: [6, 2, 5, 9, 8, 5, 4]
      },
      {
        name: 'Milling',
        type: 'line',
        stack: 'Total',
        data: [8, 4, 7, 5, 4, 2, 3]
      }
    ]
  };

  return (
    <Card className="m-4">
      <Card.Body>
      <Card.Title>Total inspections done per station</Card.Title>
        <ReactECharts  option={options}style={{ height: "400px" }}/>
      </Card.Body>
    </Card>
  );
}

export default LineChart;