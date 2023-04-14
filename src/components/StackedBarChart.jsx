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
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
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
            emphasis: {
              focus: 'series'
            },
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: 'Email',
            type: 'bar',
            stack: 'Ad',
            emphasis: {
              focus: 'series'
            },
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: 'Union Ads',
            type: 'bar',
            stack: 'Ad',
            emphasis: {
              focus: 'series'
            },
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: 'Video Ads',
            type: 'bar',
            stack: 'Ad',
            emphasis: {
              focus: 'series'
            },
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: 'Search Engine',
            type: 'bar',
            data: [862, 1018, 964, 1026, 1679, 1600, 1570],
            emphasis: {
              focus: 'series'
            },
            markLine: {
              lineStyle: {
                type: 'dashed'
              },
              data: [[{ type: 'min' }, { type: 'max' }]]
            }
          },
          {
            name: 'Baidu',
            type: 'bar',
            barWidth: 5,
            stack: 'Search Engine',
            emphasis: {
              focus: 'series'
            },
            data: [620, 732, 701, 734, 1090, 1130, 1120]
          },
          {
            name: 'Google',
            type: 'bar',
            stack: 'Search Engine',
            emphasis: {
              focus: 'series'
            },
            data: [120, 132, 101, 134, 290, 230, 220]
          },
          {
            name: 'Bing',
            type: 'bar',
            stack: 'Search Engine',
            emphasis: {
              focus: 'series'
            },
            data: [60, 72, 71, 74, 190, 130, 110]
          },
          {
            name: 'Others',
            type: 'bar',
            stack: 'Search Engine',
            emphasis: {
              focus: 'series'
            },
            data: [62, 82, 91, 84, 109, 110, 120]
          }
        ]
      }
      const handleDownload = () => {
        // Create a CSV string from your chart data
        const csvData = "Category,Direct,Email,Union Ads,Video Ads,Search Engine,Baidu,Google,Bing,Others\n" +
          options.xAxis[0].data.map((category, index) => (
            `${category},${options.series[0].data[index]},${options.series[1].data[index]},${options.series[2].data[index]},${options.series[3].data[index]},${options.series[4].data[index]},${options.series[5].data[index]},${options.series[6].data[index]},${options.series[7].data[index]},${options.series[8].data[index]}`
          )).join("\n");
    
        // Convert CSV string to Blob
        const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
    
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