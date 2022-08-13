import * as React from "react";
import OutlinedCard from "./OutlinedCard";
import "../App.css";
import Grid from "@mui/material/Grid";

function Board(props) {
  return (
    <Grid
      justify="space-between"
      container
      spacing={6}
    >
      {props.data.map((post) => (
        <Grid item xs={4} >
          <OutlinedCard data={post}></OutlinedCard>
        </Grid>
      ))}
    </Grid>
  );
}
export default Board;
