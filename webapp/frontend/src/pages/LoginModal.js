import { Button, TextField, Typography } from "@mui/material";
import { makeStyles, createTheme, ThemeProvider } from "@mui/material/styles";
import { React, useState, useContext } from "react";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { UserContext } from "../context/UserContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const theme = createTheme({
  palette: {
    primary: {
      main: "#E7C27D",
    },
  },
});

function LoginModal(props) {
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const { token, setToken, user, setUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("username", username);
    data.append("password", password);

    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
    };
    const response = await axios.post("https://young-hamlet-61577.herokuapp.com/api/auth/token",
        data,
        { headers: headers }
    );
    localStorage.setItem("access_token", response.data.access_token);
    localStorage.setItem("refresh_token", response.data.refresh_token);
    setLoggedIn(true);
    setToken(response.data.access_token);
    //erase the input after submission
    setPassword("");
    setUsername("");
    //close the dialog
    props.onSignIn(false);
  };

  return (
    <Modal
      open={props.signIn}
      onClose={() => props.onSignIn(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <ThemeProvider theme={theme}>
          {!loggedIn ? (
            <div>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Login to MooDAY
              </Typography>
              <form onSubmit={handleSubmit}>
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

                <Button type="submit" style={{ float: "right" }}>
                  Login
                </Button>
              </form>{" "}
            </div>
          ) : (
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Login success!
            </Typography>
          )}
        </ThemeProvider>
      </Box>
    </Modal>
  );
}

export default LoginModal;
