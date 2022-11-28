import Head from "next/head";
import TowerCard from "../components/tower-card";
import { useGetUserTowers, useGetUser } from "../hooks/useApiRequest";
import { Box, Typography } from "@mui/material";

import Layout from "../components/layout";
import LoadingIndicator from "../components/loading-indicator";
import Error from "../components/error";

export default function Home() {
  const { towers, error: towerError } = useGetUserTowers();
  const { user, error: userError } = useGetUser();

  if (towerError || userError){
    return <Error/>;
  }

  if (!towers || !user){
    return <LoadingIndicator/>;
  }

  return (
    <div>
      <Head>
        <title>CTM</title>
        <meta name="description" content="Capitola Tower Management" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Layout>
          <Box sx={{ my: 6 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Welcome back
            </Typography>

            <Typography
              color="text.secondary"
              variant="h6"
              component="div"
              gutterBottom
            >
              {user.name}
            </Typography>
          </Box>
          <Box sx={{ my: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Your current towers
            </Typography>
            {towers.map((tower) => (
              <TowerCard tower={tower} key={tower._id} />
            ))}
          </Box>
        </Layout>
      </main>
    </div>
  );
}
