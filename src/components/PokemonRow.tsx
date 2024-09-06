import React from "react";
import { Card, CardContent, CardMedia, Typography, Chip } from "@mui/material";

interface prop {
  id: number;
  name: string;
  sprite: string;
  type: string[];
}

const PokemonRow: React.FC<prop> = ({ id, name, sprite, type }) => {
  return (
    <Card
      sx={{
        width: {
          xs: "100%",
          lg: "1000px",
        },
        maxWidth: "100%",
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
        },
      }}
    >
      <CardMedia component="img" height="40" image={sprite} alt={name} />
      <CardContent>
        <Typography variant="h6" component="div">
          #{id}
        </Typography>
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

export default PokemonRow;

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
