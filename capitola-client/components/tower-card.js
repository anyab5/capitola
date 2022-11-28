import Link from "next/link";
import { Card, CardContent, Typography } from "@mui/material";
import Date from "./date";

export default function TowerCard({ tower }) {
  const { name, description, date, _id } = tower;
  const route = `/tower/${_id}`;
  return (
    <Link href={route}>
      <Card sx={{ minWidth: 275, my: 3 }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            {name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            <Date dateString={date} />
          </Typography>
          <Typography variant="body2">{description}</Typography>
        </CardContent>
      </Card>
    </Link>
  );
}
