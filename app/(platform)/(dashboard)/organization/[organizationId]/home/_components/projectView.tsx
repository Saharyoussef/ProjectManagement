import React from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
} from "@mui/material";
import BaseCard from "./DashboardCard";

const urgentTasks = [
  {
    task: "Create user account",
    project: "Bankerise",
    deadline: "-24H",
  },
  {
    task: "AI chatbot",
    project: "Bankerise",
    deadline: "-48H",
  },
  // Ajoutez d'autres tâches si nécessaire
];

const ProjectView = () => {
  return (
    <BaseCard title="">
      <TableContainer
        sx={{
          borderRadius: '16px',
          padding: '16px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h6" component="div" sx={{ fontSize: '18px', fontWeight: 'bold', mb: 2 }}>
          Urgent Tasks
        </Typography>
        <Table
          aria-label="simple table"
          sx={{
            whiteSpace: "nowrap",
            mt: 2,
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Task
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Project
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography color="textSecondary" variant="h6">
                  Deadline
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {urgentTasks.map((task, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Typography variant="h6">{task.task}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">{task.project}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h6" sx={{ color: 'red', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                    {task.deadline}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </BaseCard>
  );
};

export default ProjectView;
