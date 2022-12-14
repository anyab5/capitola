import Image from "next/image";
import { Container } from "@mui/material";

export default function Layout({ children }) {
  return (
    <div>
      <Image
        src="/gradient-background.jpg"
        alt="header"
        width="1750"
        height="200"
      />
      <Container maxWidth="sm" sx={{ py: 3, height: "100vh" }}>
        {children}
      </Container>
    </div>
  );
}
