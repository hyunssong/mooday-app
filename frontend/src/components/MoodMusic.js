import React, { useEffect, useState } from 'react';
import axios from "axios";
import './MoodMusic.css';
import AudioControls from "./AudioControls";
import { Typography } from '@mui/material';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from '@mui/icons-material/Favorite';
import Box from "@mui/material/Box";

const encode_sentiment = (sentiment) =>{
    let sentIdx = 0;
    switch (sentiment) {
    case "positive":
        sentIdx = 3;
        break;
    case "neutral":
        sentIdx = 2;
        break;
    case "negative":
        sentIdx = 1;
        break;
    default:
        sentIdx = 0;
        break;
    }
    return sentIdx;
}

function MoodMusic(props) {
    const [posts, setPosts] = useState(props.posts);
    const [music, setMusic] = useState(props.music);
    const [songs, setSongs]  = useState([]);
    const [image, setImage] = useState([]);
    const [trackIdx, setTrackIdx]  = useState(0);

    const set_recent_mood = (moods) => {
      const recentMoods = [];
      for (let i = moods.length - 1; i >= 0; i--) {
        if (i == moods.length - 5) {
          //get recent 5 post mood
          break;
        }
        recentMoods.push(moods[i]);
      }
      const recentMood = Math.round(
        recentMoods.reduce((partialSum, a) => partialSum + a, 0) /
          recentMoods.length
      );
      if (recentMood == 3) {
        return "happy";
      } else if (recentMood == 2) {
        return "neutral";
      } else {
        //recommend music but preferred music setting
        if (music == "happy") {
          return "happy";
        } else {
         return "sad";
        }
      }
    };

    useEffect(()=>{
      //fetch music by the given mood that is passed
      //get the recent mood
      //convert sentiment to numerical data
      //by the music mood set, fetch data
      const fetchSong = async () => {
        const moods = [];
        const images = [];
        posts.forEach((post) => {
          let sentiment = post.sentiment;
          moods.push(encode_sentiment(sentiment));
        });

        //set the recommended music mood by recent moods
        const mood = set_recent_mood(moods);
        const response = await axios.get(
          `https://young-hamlet-61577.herokuapp.com/api/song/mood/${mood}`
        );
        // Shuffle array
        const shuffled = response.data.sort(() => 0.5 - Math.random());
        // Get sub-array of first n elements after shuffled
        setSongs( shuffled);
        console.log(shuffled);
        //extract image urls
        songs.forEach((song)=>{
          images.push({ original: song["img"] });
        })
        setImage(images);
      };
        fetchSong();
    },[])

    const AudioPlayer = () =>{
      const { title, artist, img, url } = songs[trackIdx];
      const [clicked, setClicked] = useState(false);

      const toPrevTrack = () => {
        console.log("TODO go to prev");
        if (trackIdx == 0) { setTrackIdx(songs.length-1); }
        else{ setTrackIdx(trackIdx-1); }
        setClicked(false);
      };

      const toNextTrack = () => {
        setTrackIdx ((trackIdx+1)%(songs.length));
        setClicked(false);
      };

      const handleLikeMusic = async(click)=>{
          //update the icon
          setClicked(click);
          console.log(click);
          //current song id 
          const song_id = songs[trackIdx].id;
          console.log(song_id);
          console.log(songs[trackIdx]);
          const headers = {
            "Content-Type": "application/json",
          };

          //if current song is clicked, add to the user's like
          const data = {
            song_id : song_id,
            user_id: props.userId
          }
          const response = await axios.post(
            "https://young-hamlet-61577.herokuapp.com/api/like",
            data,
            { headers: headers }
          );
          console.log(response);
      }

      return (
        <div className="audio-player">
          <Box m={3} pt={3} className="track-info">
            {clicked ?
             <FavoriteBorderIcon style={{ float:"right", marginBottom:"200px"}} onClick={()=>handleLikeMusic(true)} />
                : <FavoriteIcon style={{ float:"right", marginBottom:"200px"}} onClick={()=>handleLikeMusic(false)} /> }

            <img
              className="artwork"
              src={img}
              alt={`track artwork for ${title} by ${artist}`}
            />
            <Typography
              align="center"
              display="block"
              variant="h3"
              className="title"
              style={{ width: "100%", alignItems: "center" }}
            >
              {title}
            </Typography>
            <br></br>
            <Typography
              align="center"
              display="block"
              variant="h4"
              className="artist"
              style={{ width: "100%", alignItems: "center" }}
            >
              {artist}
            </Typography>
            <AudioControls
              trackIdx={trackIdx}
              onPrevTrack={toPrevTrack}
              onNextTrack={toNextTrack}
              url={url}
            />
          </Box>
        </div>
      );
    }
    return (
      <div>
        {songs.length>0 && <AudioPlayer/>}
      </div>
    );
}

export default MoodMusic;