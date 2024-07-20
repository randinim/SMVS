import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
export default function CommonCard(props) {
  const { title, value } = props;
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <div className="p-4">
          <AccountBalanceIcon />
        </div>
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            {value}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
