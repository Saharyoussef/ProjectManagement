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

const staticRequests = [
  {
    id: "1",
    imageUrl: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?crop=faces&fit=crop&w=150&h=150&q=80",
    username: "John Doe",
    email: "john.doe@gmail.com"
  },
  {
    id: "2",
    imageUrl: "https://images.unsplash.com/photo-1595433707802-e1662c2a67c3?crop=faces&fit=crop&w=150&h=150&q=80",
    username: "Jane Smith",
    email: "jane.smith@gmail.com"
  },
  {
    id: "3",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=faces&fit=crop&w=150&h=150&q=80",
    username: "Alice Johnson",
    email: "alice.johnson@gmail.com"
  },
  {
    id: "4",
    imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?crop=faces&fit=crop&w=150&h=150&q=80",
    username: "Bob Brown",
    email: "bob.brown@gmail.com"
  },
  // Ajoutez d'autres demandes statiques ici avec des URL d'avatars professionnelles différentes
];

const MyContacts = () => {
  const contacts = staticRequests.map((request) => ({
    title: request.username,
    subtext: request.email,
    status: "primary.main", // Vous pouvez définir la couleur de statut comme nécessaire
    imageUrl: request.imageUrl,
  }));

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
                      <Avatar alt={contact.title} src={contact.imageUrl}>{contact.title.charAt(0)}</Avatar>
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
