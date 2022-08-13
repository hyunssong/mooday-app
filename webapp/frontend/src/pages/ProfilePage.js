import { Button, TextField } from "@mui/material";
import { makeStyles, createTheme, ThemeProvider } from "@mui/material/styles";
import { React, useEffect, useContext, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import "./ProfilePage.css";
import "bootstrap/dist/css/bootstrap.css";
import MyMusic from "../components/MyMusic";
import Grid from "@mui/material/Grid";

function ProfilePage(props) {
  const { token, setToken, user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [music, setMusic] = useState("");
  const [likes, setLikes]  = useState([]);
  const history = useHistory();
  //get current user

  useEffect( () => {

        
    setMusic(user.music); //set user music taste
    setUsername(user.username);

    const fetchLike = async () =>{
      //get this user's favorite music
      try{
        const likes_response = await axios.get(
          `https://young-hamlet-61577.herokuapp.com/api/like/${user.id}`
        );
        const data = await likes_response.data;
        setLikes(data);
      }catch(error){
 
          //request for new refresh token
          if(localStorage.getItem("refresh_token")!== null){
            const refresh_token_data = {
              access_token: localStorage.getItem("refresh_token"),
              token_type: "bearer",
            };
            try{
              //update the new access token information 
              const token_response = await axios.post(
                "https://young-hamlet-61577.herokuapp.com/api/auth/refresh",
                refresh_token_data
              );
              localStorage.setItem("access_token", token_response.data.access_token);
              setToken(token_response.data.access_token);
            }catch(error){
              localStorage.removeItem("access_token");
              localStorage.removeItem("refresh_token");
              setToken("");
              history.push("/signup"); //not authenticated
            }
          }

      }
      
    }
    fetchLike()

  },[]);

  return (
    <div className="container mt-5">
      <Grid container rowSpacing={5} sx={{ paddingTop: 5 }}>
        <Grid item xs={12}>
          <h1>Profile</h1>
          <div className="card p-3 py-4">
            <div class="row">
              <div class="col-xs-6">
                <div className="text-center">
                  <img
                    src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-512.png"
                    width="100"
                    className="rounded-circle"
                  ></img>
                </div>

                <div className=" text-center mt-2">
                  <span className="bg-secondary p-1 px-4 rounded text-white">
                    {username}
                  </span>
                  <h6 className="text-center mt-4 mb-0">user ID: {user.id}</h6>
                  <span>{email}</span>

                  <div className="text-center px-4 mt-1">
                    <p className="fonts">Recommended music: {music} </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div>{likes.length > 0 && <MyMusic likes={likes} />}</div>
          <br />
        </Grid>
        <Grid item xs={12}></Grid>
      </Grid>
    </div>
  );
}

export default ProfilePage;
