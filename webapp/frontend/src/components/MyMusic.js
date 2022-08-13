import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";

function MyMusic(props) {
  const [songs, setSongs] = useState([]);

  useEffect(()=>{
    //parse the likes to get a list of songs
    const likes = props.likes;

    const totalSongs = []
    const fetchSongs = async () =>{
      for (const like of likes){
        let song_id = like.song_id;
        //fetch the song
        const res = await axios.get(
          `https://young-hamlet-61577.herokuapp.com/api/song/${song_id}`
        );
        const data = await res.data;
        totalSongs.push(data);
      }

      setSongs(totalSongs)
    };
    fetchSongs();
  },[]);

  return (
    <div>
      <h1>
        Your <Box sx={{ fontStyle: "italic" , display:"inline"}}>favorites</Box>
      </h1>
      <Box display="flex" sx={{width:"100%"}}>
        {songs.length > 0 && (
          <div>
            <List sx={{ width: "100%", minWidth: 700 }}>
              {songs.map((song) => (
                <div>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt="Remy Sharp" src={song.img} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={song.title}
                      secondary={
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {song.artist}
                        </Typography>
                      }
                    />
                  </ListItem>
                  <Divider variant="fullWidth"/>
                </div>
              ))}
            </List>
          </div>
        )}
      </Box>
    </div>
  );
}

export default MyMusic;
