import React from "react";
import ReactECharts from "echarts-for-react";
import Loader from "./Loader";
import { Card } from "react-bootstrap";

function BarChart() {
   let options = {
    title: {
        text: 'Orders by Product Category Names'
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
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
            data: [10, 52, 200, 334, 390, 330, 220]
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