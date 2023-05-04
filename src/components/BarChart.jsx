import React from "react";
import ReactECharts from "echarts-for-react";
import Loader from "./Loader";
import { Card } from "react-bootstrap";

function BarChart() {
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
            data: ['05/01', '05/02', '05/023', '05/04', '05/05', '05/06', '05/07'],
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
            data: [10, 52, 40, 34, 40, 42, 43]
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

export default BarChart;