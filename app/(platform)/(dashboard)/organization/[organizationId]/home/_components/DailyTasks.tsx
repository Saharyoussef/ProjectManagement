import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import DashboardCard from "./DashboardCard";
import { Typography, Box } from '@mui/material';

const activities = [
  {
    time: "09.50",
    color: "success.main",
    text: "Do the design",
  },
  {
    time: "09.46",
    color: "secondary.main",
    text: "Include the authentification",
  },
  {
    time: "09.47",
    color: "primary.main",
    text: "Complete the dashboard",
  },
];

const DailyTasks = () => {
  return (
    <DashboardCard title="">
      <Box
        sx={{
          borderRadius: '16px',
          padding: '16px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h6" component="div" sx={{ fontSize: '18px', fontWeight: 'bold', mb: 2 }}>
          Daily Tasks
        </Typography>
        <Timeline
          sx={{
            p: 0,
          }}
        >
          {activities.map((activity) => (
            <TimelineItem key={activity.time}>
              <TimelineOppositeContent
                sx={{
                  fontSize: "12px",
                  fontWeight: "700",
                  flex: "0",
                }}
              >
                {activity.time}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot
                  variant="outlined"
                  sx={{
                    borderColor: activity.color,
                  }}
                />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent
                color="text.secondary"
                sx={{
                  fontSize: "14px",
                }}
              >
                {activity.text}
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </Box>
    </DashboardCard>
  );
};

export default DailyTasks;
