import React, { useState } from 'react';
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import "./AudioControl.css";

function AudioControls(props) {
    const [trackIdx, setTrackIdx] = useState(props.trackIdx);
    const [url, setUrl] = useState(props.url);

    const openInNewTab = (url) => {
      const newWindow = window.open(url, "_blank", "noopener,noreferrer");
      if (newWindow) newWindow.opener = null;
    };

    const onPrevClick = () =>{
      props.onPrevTrack();
    }
    const onNextClick = () =>{
      props.onNextTrack();
    }
    const onPlayPauseClick = () =>{
        //go to the spotify link 
        openInNewTab(url);
    }
    return (
      <div className="audio-controls">
        <button
          type="button"
          className="prev"
          aria-label="Previous"
          onClick={onPrevClick}
        >
          <SkipPreviousIcon style={{ color: "black" }} />
        </button>

        <button
          type="button"
          className="play"
          onClick={() => onPlayPauseClick(true)}
          aria-label="Play"
        >
          <PlayArrowIcon style={{ color: "black" }} />
        </button>

        <button
          type="button"
          className="next"
          aria-label="Next"
          onClick={onNextClick}
        >
          <SkipNextIcon style={{ color: "black" }} />
        </button>
      </div>
    );
}

export default AudioControls;