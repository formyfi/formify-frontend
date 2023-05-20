import React, { useEffect, useState } from "react"
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import BarChart from "components/BarChart";
import PieChart from "components/PieChart";
import LineChart from "components/LineChart";
import StackedBarChart from "components/StackedBarChart";
import { useLocation } from "react-router-dom";
import { getTotalStationsInspections} from "redux/slices/formSlice";
import {useDispatch, useSelector} from "react-redux";

export const Dashboard = () => {
  const commonState = useSelector((state) => state.common);

  const dispatch = useDispatch();
  const [totalRecords, setTotalrecords] = useState([]);
  useEffect(()=>{
    const res = dispatch(getTotalStationsInspections({org_id: commonState.org_id}));
    res.then((resp) => {
      if (resp && resp.payload) {
        setTotalrecords(resp.payload.full_lists);
      }
    })
  },[])

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
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
            <BarChart />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
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
            <LineChart />
          </Paper>
        </Grid>
        <Grid item xs={12} md={12}>
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
        {totalRecords && totalRecords.length && totalRecords.map((record)=>{
          return(
            <Grid item xs={12} md={6}>
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
            <PieChart record={record}/>
          </Paper>
        </Grid>
          )
        })}
      </Grid>
    </Container>
  )
}
