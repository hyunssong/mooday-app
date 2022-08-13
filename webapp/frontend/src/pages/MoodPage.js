import { React, useEffect, useContext, useState } from "react";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import "./ProfilePage.css";
import "bootstrap/dist/css/bootstrap.css";
import MoodChart from "../components/MoodChart";
import MoodMusic from "../components/MoodMusic";
import "./MoodPage.css";
import Typography from "@mui/material/Typography";

function MoodPage(props) {
  const { token, setToken, user, setUser } = useContext(UserContext);
  const [music, setMusic] = useState("");
  const [posts, setPosts] = useState([]);
  const history = useHistory();
  useEffect(() => {
    const fetchPost = async () => {
      try {
        //filter to get the data that is written by current user
        let response = await axios.get(
          "https://young-hamlet-61577.herokuapp.com/api/article",
          { params: { user_id: user.id } }
        );
        const post_data = await response.data;
        setPosts(post_data);
        setMusic(user.music); //set user music taste
        
      } catch (error) {
     
          //request for new refresh token
          if(localStorage.getItem("refresh_token")!== null){
            const refresh_token_data = {
              access_token: localStorage.getItem("refresh_token"),
              token_type: "bearer",
            };
            try {
              //update the new access token information
              const token_response = await axios.post(
                "https://young-hamlet-61577.herokuapp.com/api/auth/refresh",
                refresh_token_data
              );
              localStorage.setItem("access_token", token_response.data.access_token);
              setToken(token_response.data.access_token);
            
            } catch (error) {
              localStorage.removeItem("access_token");
              localStorage.removeItem("refresh_token");
              setToken("");
              history.push("/signup");
            }
          }
        }
      
    }
    fetchPost();
  }, []);

  return (
    <div className="container mt-5">
      <Grid container spacing={4} sx={{ paddingTop: 5 }}>
        <Grid item xs={4} md={4}>
          <Typography variant="h3" component="div">
            <strong>Music</strong> recommended by your recent{" "}
            <strong> mood</strong>
          </Typography>
        </Grid>
        <Grid item xs={6} md={6} sx={{marginLeft:2}}>
          {posts.length > 0 && <MoodChart posts={posts} />}
        </Grid>
        <Grid item xs={12}>
          {posts.length > 0 && (
            <MoodMusic posts={posts} music={music} userId={user.id} />
          )}
        </Grid>
        <Grid item xs={7}></Grid>
      </Grid>
    </div>
  );
}

export default MoodPage;
