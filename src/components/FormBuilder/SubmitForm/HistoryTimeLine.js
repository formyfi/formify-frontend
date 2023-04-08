import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import HotelIcon from '@mui/icons-material/Hotel';
import RepeatIcon from '@mui/icons-material/Repeat';
import Typography from '@mui/material/Typography';
import { Avatar, Box, Divider, Drawer, SwipeableDrawer } from '@mui/material';
import ChatInput from './ChatInput';


const TimeLineItem = ()=>{
  return <TimelineItem>
  <TimelineOppositeContent
    sx={{ m: 'auto 0', maxWidth: 150 }}
    align="right"
    variant="body2"
    color="text.secondary"
  >
    20 Jan, 2023 <br/>
    9:30 am
  </TimelineOppositeContent>
  <TimelineSeparator>
    <TimelineConnector />
    {/* <TimelineDot> */}
      {/* heaer Food Icon replace with icon or avtar */}
      <Avatar alt="Travis Howard" src="https://picsum.photos/id/1/500" />
    {/* </TimelineDot> */}
    <TimelineConnector />
  </TimelineSeparator>
  <TimelineContent sx={{ py: '12px', px: 2 }}>
    <Typography variant="h6" component="span">
      TRavis Howard
    </Typography>
    <Typography>Hello I have question for Text or Image ? Hello I have question for Text or Image ?Hello I have question for Text or Image ?Hello I have question for Text or Image ?Hello I have question for Text or Image ?Hello I have question for Text or Image ?</Typography>
  </TimelineContent>
</TimelineItem>
}

export function CustomTimeLine() {
  return (
    <Timeline >
        <TimeLineItem />
        <TimeLineItem />
        <TimeLineItem />
        <TimeLineItem />
    </Timeline>
  );
}


export default function HistoryTimeLine({ open,closeHandler }) {
  return (<SwipeableDrawer
    anchor={'bottom'}
    open={open}
    onClose={closeHandler}
  >
    <Box sx={{ p:5 }} >
      <Typography component="h2" variant="h6" color="primary">
        Form Journey
      </Typography>
      <Divider />
     <Box  >
     <CustomTimeLine />
     </Box>
    <ChatInput />
    </Box>
  </SwipeableDrawer>)
}