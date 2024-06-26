import React from "react";
import {
  Typography,
  Avatar,
  Box,
  Card,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemButton,
  Badge,
} from "@mui/material";
import DashboardCard from "./DashboardCard";

const contacts = [
  {
    title: "Oliver Jake",
    subtext: "info@oliver.com",
    status: "primary.main",
  },
  {
    title: "Jack Connor",
    subtext: "info@jack.com",
    status: "secondary.main",
  },
  {
    title: "Harry Callum",
    subtext: "info@harry.com",
    status: "error.main",
  },
  {
    title: "Jacob Reece",
    subtext: "info@jacob.com",
    status: "warning.main",
  },
];

const MyContacts = () => {
  return (
    <DashboardCard title="">
      <Card variant="outlined" sx={{ borderRadius: '16px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <Box px={2} py={2}>
          <Typography variant="h6" sx={{ fontSize: '18px', fontWeight: 'bold', mb: 2 }}>
            My Contacts
          </Typography>
        </Box>
        <Box pt={2}>
          <List>
            {contacts.map((contact, i) => (
              <ListItem key={i}>
                <ListItemButton>
                  <ListItemAvatar>
                    <Badge
                      variant="dot"
                      overlap="circular"
                      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                      badgeContent={<Avatar sx={{ width: 10, height: 10, backgroundColor: contact.status }} />}
                    >
                      <Avatar>{contact.title.charAt(0)}</Avatar>
                    </Badge>
                  </ListItemAvatar>
                  <ListItemText
                    primary={contact.title}
                    primaryTypographyProps={{
                      fontSize: "16px",
                      fontWeight: 500,
                      color: "black",
                    }}
                    secondary={contact.subtext}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Card>
    </DashboardCard>
  );
};

export default MyContacts;
