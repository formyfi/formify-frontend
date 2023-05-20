import { Card } from "react-bootstrap";
import React from "react";
import ReactECharts from "echarts-for-react";

import "@mui/material/styles";


function PieChart({ record }) {

 let options = {
    title: {
      text: record.station_name,
      subtext: 'Total Inspections',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: 'Inspections Record',
        type: 'pie',
        radius: '60%',
        data: [
          { value: record.non_compliant_records, name: 'Non Compliant' },
          { value: record.compliant_records, name: 'Compliant' },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
  return (
    <Card className="m-4">
      <Card.Body>
        <ReactECharts style={{ height: "400px" }} option={options} />
      </Card.Body>
    </Card>
  );
}

export default PieChart;