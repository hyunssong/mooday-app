import { Button, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {React, useContext, useState} from 'react';
import Grid from "@mui/material/Grid";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import {UserContext} from "../context/UserContext";

function SignupPage(props) {
    const history = useHistory();

    const theme = createTheme({
      palette: {
        primary: {
          main: "#E7C27D",
        },
      },
    });

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [music, setMusic] = useState("happy");
    const { token, setToken, user, setUser } = useContext(UserContext);

    const headers = {
       "Content-Type": "application/json",
     };

    const handleSubmit = async (e) => {
      e.preventDefault();
      //send the data to backend to create user
      console.log(email, password, username, music);
      const data = {
        email: email,
        password: password,
        username: username,
        music: music,
      };
      //create user with the given data
      const response = await axios.post(
        "https://young-hamlet-61577.herokuapp.com/api/user",
        data,
        { headers: headers }
      );
      console.log(response)
      if (response.ok) {
        localStorage.setItem("access_token", response.data.access_token); //set credentials
        localStorage.setItem("refresh_token", response.data.refresh_token); //set credentials
        setToken(response.data.access_token);
      }
      //redirect
      history.push("/home");
    };

    return (
      <Grid
        container
        spacing={2}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ margin: 4 }}
      >
        <Grid item xs={12}>
          <form onSubmit={handleSubmit} style={{ width: "100ch" }}>
            <ThemeProvider theme={theme}>
              <TextField
                label="Email"
                type="email"
                required
                variant="filled"
                value={email}
                margin="dense"
                fullWidth
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <TextField
                label="Username"
                required
                variant="filled"
                value={username}
                margin="dense"
                fullWidth
                onChange={(e) => setUsername(e.target.value)}
              />
              <br />
              <TextField
                label="Password"
                type="password"
                required
                variant="filled"
                margin="dense"
                value={password}
                fullWidth
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />
              <br />
              What kind of music do you listen when you feel down? <br />
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="happy"
                name="radio-buttons-group"
                onChange={(e) => setMusic(e.target.value)}
              >
                <FormControlLabel
                  value="happy"
                  control={<Radio />}
                  label="happy"
                />
                <FormControlLabel value="sad" control={<Radio />} label="sad" />
              </RadioGroup>
              {/* TODO: do input checking  */}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ float: "right" }}
              >
                Signup
              </Button>
            </ThemeProvider>
          </form>
        </Grid>
      </Grid>
    );
}

export default SignupPage;