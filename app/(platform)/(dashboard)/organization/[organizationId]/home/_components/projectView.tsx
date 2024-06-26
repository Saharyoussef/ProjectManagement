import React from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  TableContainer,
} from "@mui/material";
import BaseCard from "./DashboardCard";

const projects = [
  {
    id: "1",
    project: "Devops",
    teamLead: "Asma Ali",
    priority: "Low",
    pbg: "#392348",
    deadline: "2024-06-30",
  },
  {
    id: "2",
    project: "Security Testing",
    teamLead: "Andrew Josh",
    priority: "Medium",
    pbg: "#a986c6",
    deadline: "2024-07-15",
  },
  // Ajoutez plus de projets si nécessaire
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
          Projects Overview
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
                  Id
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Project
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Team Lead
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Priority
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
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell>
                  <Typography fontSize="15px" fontWeight={500}>
                    {project.id}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" fontWeight={400}>
                    {project.project}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" fontSize="13px">
                    {project.teamLead}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    sx={{
                      pl: "4px",
                      pr: "4px",
                      backgroundColor: project.pbg,
                      color: "#fff",
                    }}
                    size="small"
                    label={project.priority}
                  ></Chip>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h6">{project.deadline}</Typography>
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
