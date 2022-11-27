import * as React from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  Divider,
  ListItemText,
  Typography,
  Avatar,
} from "@mui/material";

// function ListItem(item) {
//   return (
//     <ListItem alignItems="flex-start">
//       <ListItemText primary={item.name} secondary={item.description} />
//     </ListItem>
//   );
// }

export default function ListModal({ items, onSelect }) {
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {items.map((item) => {
        return (
          <>
            <ListItem alignItems="flex-start">
              <ListItemText primary={item.name} secondary={item.description} />
            </ListItem>
            <Divider variant="inset" component="li" />
          </>
        );
      })}
    </List>
  );
}
