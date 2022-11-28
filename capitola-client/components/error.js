import Layout from "./layout";
import { Typography } from "@mui/material";

export default function Error() {
  return (
    <Layout>
      <Typography variant="h4" my="40px">Oopps, something unexpected happened..</Typography>
      <Typography variant="body" mt="40px">Maybe someone fell from a tower :) </Typography>
    </Layout>
  );
}
