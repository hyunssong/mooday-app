import { useState, React, useContext} from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import useInput from "../components/post-input";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Typography from "@mui/material/Typography";

const theme = createTheme({
  palette: {
    primary: {
      main: "#E7C27D",
    },
  },
});

function NewPostPage(props) {
  const { token, setToken, user, setUser } = useContext(UserContext);
  const history = useHistory();
  const isNotEmpty = (value) => value.trim() != "";
  const {
    value: enteredTitle,
    isValid: enteredTitleIsValid,
    hasError: titleHasError,
    valueChangeHandler: titleChangeHandler,
    inputBlurHandler: titleBlurHandler,
    reset: resetTitle,
  } = useInput(isNotEmpty);

  const {
    value: enteredContent,
    isValid: enteredContentIsValid,
    hasError: contentHasError,
    valueChangeHandler: contentChangeHandler,
    inputBlurHandler: contentBlurHandler,
    reset: resetContent,
  } = useInput(isNotEmpty);

  const formIsValid = enteredTitleIsValid && enteredContentIsValid;

  const [sentiment, setSentiment] = useState("");

  const headers = {
    "Content-Type": "application/json",
  };

  const formSubmissionHandler = async (event) => {
    event.preventDefault();

    if (!enteredTitleIsValid || !enteredContentIsValid) {
      return;
    }
    //send data to backend
    //get the sentiment analysis result on this text
    const res = await axios.post(
      "https://young-hamlet-61577.herokuapp.com/api/analysis/predict",
      {
        text: enteredContent,
      },
      { headers: headers }
    );
    setSentiment(res.data.sentiment);
    //get current user
    //TODO:add this result to post
    const data = {
      title: enteredTitle,
      content: enteredContent,
      sentiment: res.data.sentiment,
      published: true,
      user_id: user.id
    };
    await axios.post(
      "https://young-hamlet-61577.herokuapp.com/api/article",
      data,
      { headers: headers }
    );
    //reset the page
    resetTitle();
    resetContent();
    //redirect
    history.push("/home")
  };


  return (
    <Grid
      container
      rowSpacing={2}
      sx={{ paddingTop: 5 }}
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={12} md={8} sx={{ m: 5 }}>
        <Typography variant="h2" component="div">
          Today was ...{" "}
        </Typography>
      </Grid>
      <form onSubmit={formSubmissionHandler}>
        <Grid item xs={12} md={8}>
          {titleHasError && (
            <TextField
              error
              id="name"
              label="Title"
              variant="standard"
              helperText="Please enter the title"
              margin="dense"
              onChange={titleChangeHandler}
              onBlur={titleBlurHandler}
              value={enteredTitle}
              style={{ width: "60vw" }}
            />
          )}
          {!titleHasError && (
            <TextField
              id="name"
              label="Title"
              variant="standard"
              margin="dense"
              onChange={titleChangeHandler}
              onBlur={titleBlurHandler}
              color="primary"
              value={enteredTitle}
              style={{ width: "60vw" }}
            />
          )}
        </Grid>
        <Grid item xs={12} md={8} sx={{ marginTop: 2 }}>
          {contentHasError && (
            <TextField
              error
              multiline
              label="Content"
              variant="outlined"
              margin="dense"
              rows={5}
              style={{ width: "60vw"}}
              onChange={contentChangeHandler}
              onBlur={contentBlurHandler}
              color="warning"
              helperText="Please enter the post content."
              value={enteredContent}
            />
          )}
          {!contentHasError && (
            <TextField
              multiline
              label="Content"
              variant="outlined"
              margin="dense"
              rows={5}
              style={{ width: "60vw"}}
              onChange={contentChangeHandler}
              onBlur={contentBlurHandler}
              color="primary"
              value={enteredContent}
            />
          )}
        </Grid>
        <Grid item xs={12} md={8} sx={{ marginTop: 2, mb:3 }}>
          <div>
            <Button
              variant="outlined"
              disabled={!formIsValid}
              color="primary"
              type="submit"
            >
              Submit
            </Button>
          </div>
        </Grid>
      </form>
    </Grid>
  );
}

export default NewPostPage;
