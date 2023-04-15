import React, { useEffect, useState } from "react"
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import BarChart from "components/BarChart";
import LineChart from "components/LineChart";
import StackedBarChart from "components/StackedBarChart";
import { useLocation } from "react-router-dom";

export const Dashboard = () => {
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={2} >
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 1,
              display: 'flex',
              flexDirection: 'column',
              height: 415,
              width: '100%',
              margin: 2,
            }}
          >
            <BarChart />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 1,
              display: 'flex',
              flexDirection: 'column',
              height: 415,
              width: '100%',
              margin: 2,
            }}
          >
            <LineChart />
          </Paper>
        </Grid>
        <Grid item xs={12} md={12} >
          <Paper
            sx={{
              p: 1,
              display: 'flex',
              flexDirection: 'column',
              height: 450,
              width: '100%',
              margin: 2,
            }}
          >
            <StackedBarChart />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}
