import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import HotelIcon from "@mui/icons-material/Hotel";
import RepeatIcon from "@mui/icons-material/Repeat";
import Typography from "@mui/material/Typography";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  SwipeableDrawer,
} from "@mui/material";
import ChatInput from "./ChatInput";
import { useDispatch, useSelector } from "react-redux";
import { getFormTimeLine } from "redux/slices/formSlice";
import moment from "moment";

const TimeLineItem = ({ record }) => {
  return (
    <TimelineItem>
      <TimelineOppositeContent
        sx={{ m: "auto 0", maxWidth: 150 }}
        align="right"
        variant="body2"
        color="text.secondary"
      >
        {moment(record.created_at,'YYYY-MM-DD hh:mm:ss').format('ll')} <br />
        {moment(record.created_at,'YYYY-MM-DD hh:mm:ss').format('LT')}
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineConnector />
        {/* <TimelineDot> */}
        {/* heaer Food Icon replace with icon or avtar */}
        <Avatar
          alt={record?.first_name?(record?.first_name + " " + record?.last_name):'system'}
        />
        {/* </TimelineDot> */}
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent sx={{ py: "12px", px: 2 }}>
        <Typography variant="h6" component="span">
          {record?.first_name?(record?.first_name + " " + record?.last_name):'system'}
        </Typography>
          <Typography>{record.text}</Typography>
        <Box>
          {
            record.images && record.images.split(',').map((img)=>{
              return (<img src={process.env.REACT_APP_API_BASE +'/'+ img} style={{ width: '100px' }} />)
            })
          }
        </Box>
      </TimelineContent>
    </TimelineItem>
  );
};

export function CustomTimeLine({ records }) {
  return (
    <Timeline>
      {records &&
        records.map((record) => {
          return <TimeLineItem record={record} />;
        })}
    </Timeline>
  );
}

export default function HistoryTimeLine({ open, closeHandler, vnumberValue }) {
  const formState = useSelector((state) => state.checkList);
  const dispatch = useDispatch();
  const [addNew, setAddNew] = React.useState(false);

  React.useEffect(() => {
    dispatch(getFormTimeLine(vnumberValue));
  }, [addNew]);

  const addNewHandler = () => {
    setAddNew(!addNew);
  };

  return (
    <SwipeableDrawer anchor={"bottom"} open={open} onClose={closeHandler}>
      <Box sx={{ p: 5 }}>
        <Box sx={{ pb: 3, display: "flex", gap: "15px" }}>
          <Typography component="h2" variant="h6" color="primary">
            Form Journey
          </Typography>
          <Button variant="contained" onClick={addNewHandler}>
            {!addNew ? "Add" : "View All"}
          </Button>
          <Button variant="outlined" onClick={closeHandler} >
            Close
          </Button>
        </Box>
        <Divider sx={{ mb: 3 }} />
        {!addNew && (
          <Box>
            <CustomTimeLine records={formState.formTimeline.data} />
          </Box>
        )}
        {addNew && <ChatInput vnumberValue={vnumberValue} closeAddNew={addNewHandler} />}
      </Box>
    </SwipeableDrawer>
  );
}
