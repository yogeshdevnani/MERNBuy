import {
  Avatar,
  Card,
  CardContent,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import React from "react";
// https://github.com/devias-io/material-kit-react
const DashboardCard = (props) => {
  const { cardName, cardNumber, cardSymbol } = props;
  return (
    <Card sx={{ height: "100%", width: "100%", margin: "10px" }}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography color="text.secondary" variant="overline">
              {cardName}
            </Typography>
            <Typography variant="h4">{cardNumber}</Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: "error.main",
              height: 56,
              width: 56,
            }}
          >
            {cardSymbol}
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
