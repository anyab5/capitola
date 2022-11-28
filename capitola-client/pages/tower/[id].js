import {useGetCarriers, useGetTower} from "../../hooks/useApiRequest";
import { useRouter } from "next/router";
import Layout from "../../components/layout";
import { Typography } from "@mui/material";
import Date from "../../components/date";
import LayerCard from "../../components/layer-card";

export default function TowerPage() {
    const { carriers } = useGetCarriers();
    const router = useRouter();

  let towerId = router.query?.id;
    const { tower } = useGetTower(towerId);

  if (!tower || !tower.layers) {
    return <div>Loading...</div>;
  }

  let layers = { assigned: [], unassigned: [] };
  tower.layers.forEach((layer) =>
    layer.carrierId
      ? layers.assigned.push(layer)
      : layers.unassigned.push(layer)
  );

  return (
    <Layout>
      <Typography variant="h2" component="div">
        {tower.name}
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        <Date dateString={tower.date} />
      </Typography>
      <Typography variant="body2">{tower.description}</Typography>
      {layers.unassigned.length ? (
        <Typography variant="h6" component="div" marginTop="50px">
          Unassigned layers
        </Typography>
      ) : null}
      {layers.unassigned.map((layer) => (
        <LayerCard key={layer._id} towerId={towerId}  layer={layer} carriers={carriers}/>
      ))}
      {layers.assigned.length ? (
        <Typography variant="h6" component="div" marginTop="50px">
          Assigned layers
        </Typography>
      ) : null}
      {layers.assigned.map((layer) => (
        <LayerCard key={layer._id} towerId={towerId} layer={layer} carriers={carriers}/>
      ))}
    </Layout>
  );
}
