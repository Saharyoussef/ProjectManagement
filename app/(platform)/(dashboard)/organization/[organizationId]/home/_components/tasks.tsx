import React from "react";
import { MenuItem, Box, IconButton, Menu, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DashboardCard from "./DashboardCard";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import MoreVertIcon from '@mui/icons-material/MoreVert';

const options = [
  "Action",
  "Another Action",
  "Something else here",
];

const Tasks = () => {
  // Menu
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Chart color
  const theme = useTheme();
  const primary = "#392348";
  const secondary = "#a986c6";

  // Chart options
  const optionscolumnchart: any = {
    chart: {
      type: "bar",
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: "#adb0bb",
      toolbar: {
        show: true,
      },
      height: 370,
    },
    colors: [primary, secondary],
    plotOptions: {
      bar: {
        horizontal: false,
        barHeight: "60%",
        columnWidth: "42%",
        borderRadius: [16, 16, 0, 0], // Rounded corners
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "all",
      },
    },
    stroke: {
      show: true,
      width: 5,
      lineCap: "butt",
      colors: ["transparent"],
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    grid: {
      borderColor: "rgba(0,0,0,0.1)",
      strokeDashArray: 3,
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    yaxis: {
      tickAmount: 4,
    },
    xaxis: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      axisBorder: {
        show: false,
      },
    },
    tooltip: {
      theme: theme.palette.mode === "dark" ? "dark" : "light",
      fillSeriesColor: false,
    },
  };

  // Chart series data
  const seriescolumnchart: any = [
    {
      name: "Tasks Assigned",
      data: [9, 5, 6, 7, 5, 10, 4],
    },
    {
      name: "Tasks Done",
      data: [6, 3, 5, 5, 4, 6, 4],
    },
  ];

  return (
    <DashboardCard
      title=""
      
      action={
        <>
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="long-menu"
            MenuListProps={{
              "aria-labelledby": "long-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            {options.map((option) => (
              <MenuItem key={option} selected={option === "Pyxis"} onClick={handleClose}>
                {option}
              </MenuItem>
            ))}
          </Menu>
        </>
      }
    >
      <Box sx={{
        borderRadius: '16px',
        padding: '16px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}>
        <Typography variant="h6" component="div" sx={{ fontSize: '18px', fontWeight: 'bold', mb: 2 }}>
          Tasks assigned and tasks done
        </Typography>
        <Chart
          options={optionscolumnchart}
          series={seriescolumnchart}
          type="bar"
          width={"100%"}
          height="370px"
        />
      </Box>
    </DashboardCard>
  );
};

export default Tasks;
