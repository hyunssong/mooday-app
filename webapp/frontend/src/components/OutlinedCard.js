import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import MoodBadIcon from "@mui/icons-material/MoodBad";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import { useHistory } from "react-router-dom";
const emoji = (sentiment)=>{
  if (sentiment=="positive"){
    return <SentimentSatisfiedAltIcon/>;
  } else if(sentiment=="negative"){
    return <MoodBadIcon/>;
  }else{
    return <SentimentSatisfiedIcon/>;
  }
}


export default function OutlinedCard(props) {
  const history = useHistory();
  const card = (props) => {
    let post = props.props; //TODO: better way to get chained data from parent?

    return (
      <React.Fragment>
        <CardContent sx={{ height: 150, overflow: "hidden" }}>
          <Typography variant="h5" component="div">
            {post.data.title}
          </Typography>
          <Typography sx={{ mb: 1 }} color="text.secondary">
            {emoji(post.data.sentiment)}
          </Typography>
          <Typography variant="body2">{post.data.content}</Typography>
        </CardContent>

        <CardActions>
          <Box display="flex" justifyContent="flex-end" alignItems="flex-end">
            <Button onClick={(e) => seePost(post.data.id)} size="small">
              More Details
            </Button>
          </Box>
        </CardActions>
      </React.Fragment>
    );
  };
  
  const seePost = (postID) => {
    history.push(`/post/${postID}`);
  };


  return (
      <Card variant="outlined" sx={{maxWidth:"20vw", height:200}}>{card({props})} </Card>
  );
}
