import * as React from "react";
import { useGetCarriers, useGetTower } from "../../hooks/useApiRequest";
import { useRouter } from "next/router";
import Layout from "../../components/layout";
import { Typography } from "@mui/material";
import Date from "../../components/date";
import LayerCard from "../../components/layer-card";

function splitLayersAndRemoveAssignedCarriers(tower, carriers) {
  if (!tower || !tower.layers || !carriers) {
    return {};
  }
  const carrierMap = new Map(carriers.map((carrier) => [carrier._id, carrier]));
  let layers = { assigned: [], unassigned: [] };
  tower.layers.forEach((layer) => {
    if (layer.carrierId) {
      layer.carrier = carrierMap.get(layer.carrierId);
      layers.assigned.push(layer);
      carrierMap.delete(layer.carrierId);
    } else {
      layers.unassigned.push(layer);
    }
  });
  const unassignedCarriers = carriers.filter((carrier) =>
    carrierMap.get(carrier._id)
  );
  return { layers, unassignedCarriers };
}

export default function TowerPage() {
  const router = useRouter();
  let towerId = router.query?.id;

  const { carriers } = useGetCarriers();
  const { tower } = useGetTower(towerId);
  const { layers, unassignedCarriers } = React.useMemo(
    () => splitLayersAndRemoveAssignedCarriers(tower, carriers),
    [tower, carriers]
  );
  if (!tower || !tower.layers || !carriers) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <Typography variant="h2" component="div">
        {tower.name}
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        <Date dateString={tower.date} />
      </Typography>
      <Typography variant="body2">{tower.description}</Typography>
      {layers.unassigned.length > 0 && (
        <Typography variant="h6" component="div" marginTop="50px">
          Unassigned layers
        </Typography>
      )}
      {layers.unassigned.map((layer) => (
        <LayerCard
          key={layer._id}
          towerId={towerId}
          layer={layer}
          carriers={unassignedCarriers}
        />
      ))}
      {layers.assigned.length > 0 && (
        <Typography variant="h6" component="div" marginTop="50px">
          Assigned layers
        </Typography>
      )}
      {layers.assigned.map((layer) => (
        <LayerCard
          key={layer._id}
          towerId={towerId}
          layer={layer}
          carriers={unassignedCarriers}
        />
      ))}
    </Layout>
  );
}
