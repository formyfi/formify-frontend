import React from "react";
import ReactECharts from "echarts-for-react";

import { saveAs } from "file-saver"; 
import { Box, Button } from "@mui/material";
function StackedBarChart() {

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
            type: 'category',
            data: ['05/01', '05/02', '05/023', '05/04', '05/05', '05/06', '05/07']
          }
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
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: 'Compliant',
            type: 'bar',
            stack: 'Ad',
            emphasis: {
              focus: 'series'
            },
            data: [200, 250, 200, 300, 300, 260, 230]
          },
          {
            name: '',
            type: 'bar',
            stack: 'Ad',
            emphasis: {
              focus: 'series'
            },
            data: [0, 0, 0, 0, 0, 0, 0]
          },
          {
            name: 'Non Compliant',
            type: 'bar',
            stack: 'Ad',
            emphasis: {
              focus: 'series'
            },
            data: [120, 82, 101, 34, 90, 70, 90]
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