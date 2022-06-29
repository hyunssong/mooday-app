import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Typography } from "@mui/material";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";

function ViewPost(props) {
  const params = useParams();
  const [data, setData] = useState(undefined);
  useEffect(() => {
    const fetchPost = async (postID) => {
      const res = await axios.get(
        `https://young-hamlet-61577.herokuapp.com/api/article/${postID}`
      );
      const data = res.data;
      setData(data.data);
    };
    fetchPost(params.postId);
    console.log(data);
  }, []);

  return (
    <div>
      {data && (
        <Grid
          container
          spacing={0}
          alignItems="center"
          justifyContent="center"
          sx={{ paddingTop: 5 }}
          xs={12}
          md={8}
        >
          <Grid item xs={12}>
            <Box
              sx={{ height: 800, m: 5 }}
              xs={12}
              md={8}
              spacing={3}
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="h3" component="div" sx={{ mb: 2 }}>
                Title: {data.title}
              </Typography>

              <Typography variant="h5" component="div" color="#AFADA9">
                userID: {data.user_id}
              </Typography>
              <hr />
              <Typography variant="h4" component="div" sx={{ mb: 5 }}>
                {data.content}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      )}
    </div>
  );
}

export default ViewPost;
