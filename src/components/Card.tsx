import React from "react";
import { Card, CardContent, CardMedia, Typography, Chip } from "@mui/material";

interface prop {
  name: string;
  sprite: string;
  type: string[];
}

const PokemonCard: React.FC<prop> = ({ name, sprite, type }) => {
  const getTypeColr = (type: string) => {
    switch (type) {
      case "water":
        return "blue";
      case "grass":
        return "green";
      case "bug":
        return "#008000";
      case "flying":
        return "#3dc7ef";
      case "fire":
        return "#fd7d24";
      case "poison":
        return "#b97fc9";

      default:
        return "grey";
    }
  };
  return (
    <Card sx={{ maxWidth: 250, maxHeight: 350 }}>
      <CardMedia component="img" height="50" image={sprite} alt={name} />
      <CardContent>
        <Typography variant="h6" component="div">
          {name}
        </Typography>
        <div>
          {type.map((type) => (
            <Chip
              key={type}
              label={type}
              sx={{
                margin: "3px",
                textTransform: "capitalize",
                backgroundColor: getTypeColr(type),
                color: "white",
              }}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PokemonCard;
