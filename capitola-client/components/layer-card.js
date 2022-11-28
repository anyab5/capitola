import * as React from "react";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { addCarrierToLayer } from "../hooks/useApiRequest";
import { useSWRConfig } from "swr";
import ListDialog from "./list-dialog";
import { Add } from "@mui/icons-material";

//TODO: map carrier to list item
//todo: show carrier name when assigned
//todo: if already used do not show in the list

export default function LayerCard({ towerId, layer, carriers }) {
  const { name, description, amount } = layer;
  const { mutate } = useSWRConfig();
  const [open, setOpen] = React.useState(false);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const updateLayerAssignment = async (carrier) => {
    layer.carrierId = carrier._id;
    await mutate(`tower/${towerId}`, addCarrierToLayer(towerId, layer));
  };

  return (
    <>
      <Card sx={{ minWidth: 275, my: 3 }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            {name}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {description}
          </Typography>
          <Typography color="text.secondary">Insured cost: {amount}</Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            onClick={() =>
              layer.carrierId ? updateLayerAssignment({}) : handleOpenDialog()
            }
          >
            {!layer.carrierId ? "Assign" : "Release"}
          </Button>
        </CardActions>
      </Card>
      <ListDialog
        items={carriers}
        title="Choose carrier"
        open={open}
        onClose={handleCloseDialog}
        onSelect={updateLayerAssignment}
        actionIcon={()=><Add/>}
      ></ListDialog>
    </>
  );
}
