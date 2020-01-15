import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";

export default function GameIcon( { verse, setGameIndex, currentGameIndex, gameIndex, Icon } ) {
    return           <IconButton
    color={verse.progress[gameIndex].complete ? "primary" : "default"}
    aria-label="upload picture"
    component="span"
    onClick={() => {
      setGameIndex(gameIndex);
    }}
  >
    <Badge
      badgeContent={
        verse.progress[gameIndex].count >= 2 ? verse.progress[gameIndex].count : 0
      }
      color="secondary"
      overlap="circle"
    >
      <Icon
        fontSize="large"
        style={{
          borderBottom: currentGameIndex === gameIndex ? "3px solid #f50057" : "3px solid transparent"
        }}
      />
    </Badge>
  </IconButton>
  }
  