import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import LaptopMacIcon from "@material-ui/icons/LaptopMac";
import HotelIcon from "@material-ui/icons/Hotel";
import RepeatIcon from "@material-ui/icons/Repeat";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import { deepOrange, deepPurple } from "@material-ui/core/colors";

const axios = require("axios");

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "6px 16px",
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));

const App = () => {
  const classes = useStyles();
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("/api/schedule").then((response) => {
      setData(response.data);
    });
  }, []);

  return (
    <div>
      <Timeline align="alternate">
        {data.map((item) => (
          <TimelineItem>
            <TimelineOppositeContent></TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot>
                <Avatar>{item.name[0]}</Avatar>
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Paper elevation={3} className={classes.paper}>
                <Typography variant="h6" component="h1">
                  {item.name}
                </Typography>
                <Typography>{item.date}</Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </div>
  );
};

export default App;

//{data.map((item) => (
//  <h1>{item.name}</h1>
//))}

//function App() {
//  const [data, setData] = useState([]);
//  useEffect(async () => {
//    const response = await axios.get("/api/schedule");
//    const mydata = response.data;
//    setData(mydata);
//    console.log(data);
//  }, []);
//}

//useEffect(async () => {
//  const response = await axios.get("/api/schedule");
//  const mydata = response.data;
//  setData(mydata);
//  console.log(mydata);
//}, []);
