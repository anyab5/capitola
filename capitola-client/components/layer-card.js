import * as React from "react";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { updateCarrierForLayer } from "../services/api-client";
import { useSWRConfig } from "swr";
import ListDialog from "./list-dialog";
import { Add } from "@mui/icons-material";

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
    //const options = { optimisticData: user, rollbackOnError: true }
    await mutate(`tower/${towerId}`, updateCarrierForLayer(towerId, layer));
  };

  const isAssigned = layer.carrierId;
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
          <Typography color="text.secondary">
            Insured cost: {amount}
          </Typography>
          {isAssigned && (
            <Typography variant="subtitle1" mt="15px">
              Carrier: {layer?.carrier?.name}
            </Typography>
          )}
        </CardContent>
        <CardActions>
          <Button
            size="small"
            onClick={() =>
              isAssigned ? updateLayerAssignment({}) : handleOpenDialog()
            }
          >
            {isAssigned ? "Release" : "Assign"}
          </Button>
        </CardActions>
      </Card>
      <ListDialog
        items={carriers}
        title="Choose carrier"
        open={open}
        onClose={handleCloseDialog}
        onSelect={updateLayerAssignment}
        actionIcon={() => <Add />}
      ></ListDialog>
    </>
  );
}
