import Layout from "./layout";
import { Typography } from "@mui/material";
import Image from "next/image";

export default function Error() {
  return (
    <Layout>
      <Typography variant="h5" my="40px">Oopps, something unexpected happened..</Typography>
        <Image
        src="/fall-from-tower.jpg"
        alt="Error"
        width="650"
        height="300"
     />
    </Layout>
  );
}
