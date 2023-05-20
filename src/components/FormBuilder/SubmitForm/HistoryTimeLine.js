import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import Typography from "@mui/material/Typography";
import {
  Avatar,
  Box,
  Button,
  Divider,
  SwipeableDrawer,
  Skeleton,
} from "@mui/material";
import ChatInput from "./ChatInput";
import { useDispatch, useSelector } from "react-redux";
import { getFormTimeLine } from "redux/slices/formSlice";
import moment from "moment";

const TimeLineItem = ({ record }) => {
  const stringToColor = (string) => {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  };

  const stringAvatar = (name) => {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  };
  return (
    <TimelineItem>
      <TimelineOppositeContent
        sx={{ m: "auto 0", maxWidth: 150 }}
        align="right"
        variant="body2"
        color="text.secondary"
      >
        {moment(record.created_at, "YYYY-MM-DD hh:mm:ss").format("ll")} <br />
        {moment(record.created_at, "YYYY-MM-DD hh:mm:ss").format("LT")}
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineConnector />
        {/* <TimelineDot> */}
        {/* heaer Food Icon replace with icon or avtar */}
        <Avatar
          {...stringAvatar(
            record?.first_name
              ? record?.first_name + " " + record?.last_name
              : "System Message"
          )}
        />
        {/* </TimelineDot> */}
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent sx={{ py: "12px", px: 2 }}>
        <Typography variant="h6" component="span">
          {record?.first_name
            ? record?.first_name +
              " " +
              record?.last_name +
              " [" +
              record?.name +
              "]"
            : "System"}
        </Typography>
        <Typography>{record.text}</Typography>
        <Box>
          {record.images &&
            record.images.split(",").map((img) => {
              return (
                <img
                  src={process.env.REACT_APP_API_BASE + "/" + img}
                  style={{ width: "100px" }}
                  alt="record img"
                />
              );
            })}
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

export default function HistoryTimeLine({
  open,
  closeHandler,
  vnumberValue,
  stationValue,
}) {
  const formState = useSelector((state) => state.checkList);
  const commonState = useSelector((state) => state.common);
  const dispatch = useDispatch();
  const [addNew, setAddNew] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      setLoading(true);
      const res = dispatch(
        getFormTimeLine({ v_num: vnumberValue, org_id: commonState.org_id })
      );
      res.then(() => setLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addNew, open]);

  const addNewHandler = () => {
    setAddNew(!addNew);
  };

  return (
    <SwipeableDrawer anchor={"bottom"} open={open} onClose={closeHandler}>
      <Box sx={{ p: 5 }}>
        <Box sx={{ pb: 3, display: "flex", gap: "15px" }}>
          <Typography component="h2" variant="h6" color="primary">
            Part Traveller
          </Typography>
          <Button variant="contained" onClick={addNewHandler}>
            {!addNew ? "Add" : "View All"}
          </Button>
          <Button variant="outlined" onClick={closeHandler}>
            Close
          </Button>
        </Box>
        <Divider sx={{ mb: 3 }} />
        {!addNew && (
          <Box>
            {loading ? (
              <Box sx={{ mx: 20, width: 250 }}>
                <Skeleton />
                <Skeleton animation="wave" />
                <Skeleton animation={false} />
                <Skeleton />
                <Skeleton animation="wave" />
                <Skeleton animation={false} />
              </Box>
            ) : (
              <CustomTimeLine records={formState.partTimeline?.data} />
            )}
          </Box>
        )}
        {addNew && (
          <ChatInput
            vnumberValue={vnumberValue}
            stationValue={stationValue}
            closeAddNew={addNewHandler}
          />
        )}
      </Box>
    </SwipeableDrawer>
  );
}
