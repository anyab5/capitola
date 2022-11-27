import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { addCarrierToLayer } from "../hooks/useApiRequest";
import { useSWRConfig } from "swr";

export default function LayerCard({ towerId, layer }) {
  const { name, description, amount } = layer;
  const { mutate } = useSWRConfig();

  const updateLayerAssignment = async (layer, carrierId) => {
      layer.carrierId = carrierId;
      await mutate(`tower/${towerId}`, addCarrierToLayer(towerId, layer));
    };

  return (
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
          onClick={async () => {
            await mutate(`tower/${towerId}`, addCarrierToLayer(towerId, layer));
          }}
        >
          {!layer.carrierId ? "Assign" : "Relese"}
        </Button>
      </CardActions>
    </Card>
  );
}
