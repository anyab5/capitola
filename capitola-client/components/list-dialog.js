import * as React from "react";
import {
  List,
  ListItem,
  Divider,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
} from "@mui/material";

export default function ListDialog({
  title,
  items,
  onSelect,
  open,
  onClose,
  actionIcon: ActionIcon,
}) {
  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <List
          sx={{ width: "100%", maxWidth: 640, bgColor: "background.paper" }}
        >
          {items.map((item) => {
            return (
              <div key={item._id}>
                <ListItem
                  alignItems="flex-start"
                  secondaryAction={
                    <IconButton onClick={() => onSelect(item)}>
                      <ActionIcon />
                    </IconButton>
                  }
                >
                  <ListItemText
                    primary={item.name}
                    secondary={item.description}
                  />
                </ListItem>
                <Divider variant="fullWidth" component="li" />
              </div>
            );
          })}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
