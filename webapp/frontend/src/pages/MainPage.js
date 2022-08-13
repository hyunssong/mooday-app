import React from "react";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Board from "../components/Board";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import { UserContext } from "../context/UserContext";

function MainPage() {
  const [data, setData] = useState([]);
  const history = useHistory();
  const { token, setToken, user, setUser} = useContext(UserContext);
 
  useEffect(() => {
    const fetchPost = async () => {
      try {
        let response = await axios.get(
          "https://young-hamlet-61577.herokuapp.com/api/article",
          {
            params: { user_id: user.id },
          }
        );
        response = await response.data;
        //filter to get the data that is written by current user
        setData(response);
      } catch (error) {
       
          //request for new refresh token
          if (localStorage.getItem("refresh_token") !== null) {
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
              localStorage.setItem(
                "access_token",
                token_response.data.access_token
              );
              setToken(token_response.data.access_token);
              history.push("/home"); //redirect
            } catch (error) {
              localStorage.removeItem("access_token");
              localStorage.removeItem("refresh_token");
              setToken("");
              history.push("/signup");
            }
          }
        
      }
    };
    fetchPost();
  }, []);

  const addBtnHandler = (e) => {
    history.push("/new"); //push: allows to go back / change: redirect - does not
  };

  return (
    <div className="App">
      <br />
      <Grid container spacing={2} direction="column">
        <Grid item xs={12} md={8}>
          <Button
            variant="outlined"
            className="add-btn"
            onClick={(e) => addBtnHandler(e)}
          >
            Write Mood of the day
          </Button>
        </Grid>
      <Grid item xs={12} md={8}>        
          <Board data={data}></Board>
        </Grid>
      </Grid>

    </div>
  );
}

export default MainPage;
