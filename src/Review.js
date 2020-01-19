import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { navigate } from "@reach/router";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import LooksOneIcon from "@material-ui/icons/LooksOne";
import LooksTwoIcon from "@material-ui/icons/LooksTwo";
import LooksThreeIcon from "@material-ui/icons/Looks3";
import LooksFourIcon from "@material-ui/icons/Looks4";
import LooksFiveIcon from "@material-ui/icons/Looks5";
import PauseCircleFilledIcon from "@material-ui/icons/PauseCircleFilled";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import TouchAppIcon from "@material-ui/icons/TouchApp";
import KeyboardIcon from "@material-ui/icons/Keyboard";
import Slider from "@material-ui/core/Slider";
import TuneIcon from "@material-ui/icons/Tune";
import { AppContext } from "./AppContext";
import Game from "./Game";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: "white"
  },
  menuButton: {
    marginRight: theme.spacing(1)
  },
  title: {
    flexGrow: 1
  },
  offset: {
    marginTop: theme.spacing(6)
  },
  truncate: {
    webkitLineClamp: 2
  },
  buttonMargin: {
    "& > *": {
      marginRight: theme.spacing(2),
      marginBottom: theme.spacing(2)
    }
  }
}));

const getReference = verse => `${verse.book} ${verse.chapter}:${verse.verse}`;

export default function Review(props) {
  const classes = useStyles();
  const [isPlayButton, setIsPlayButton] = useState(true);
  const { state, dispatch } = useContext(AppContext);
  const verses = state.verses.filter(v =>
    v.progress.every(x => x.complete || x.disabled)
  );
  const fromVerse = verses.length ? verses[0] : {};
  const toVerse = verses.length ? verses[verses.length - 1] : {};
  const versesText = verses.reduce((memo, verse) => {
    memo += `(${verse.chapter}:${verse.verse}) ${verse.text}`;
    return memo;
  }, "");
  const words = versesText.split(" ").filter(w => w);
  const [wordIndex, setWordIndex] = useState(words.length);

  const handleChange = (obj, val) => {
    setWordIndex(val);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            className={classes.menuButton}
            aria-label="menu"
            onClick={() => navigate(`/`)}
          >
            <ArrowBackIosIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Memorize
          </Typography>
          <IconButton
            color={"inherit"}
            aria-label="upload picture"
            component="span"
            onClick={
              isPlayButton
                ? () => {
                    setIsPlayButton(false);
                    var msg = new SpeechSynthesisUtterance(versesText);
                    msg.addEventListener("end", () => {
                      setIsPlayButton(true);
                    });
                    window.speechSynthesis.speak(msg);
                  }
                : null
            }
          >
            {isPlayButton ? (
              <PlayCircleFilledIcon />
            ) : (
              <PauseCircleFilledIcon />
            )}
          </IconButton>
        </Toolbar>
      </AppBar>

      <div style={{ margin: "0 1rem" }} contentEditable={false}>
        <h2 style={{ margin: "1rem 0" }}>{`${getReference(
          fromVerse
        )} - ${getReference(toVerse)}`}</h2>
        <>
          <p style={{ fontSize: "1.25rem" }}>
            {wordIndex >= words.length
              ? versesText
              : words.map((word, i) => {
                  return i >= wordIndex ? (
                    <span>
                      <span
                        style={{
                          color: "transparent",
                          borderBottom: "1px solid black"
                        }}
                      >
                        {word}
                      </span>{" "}
                    </span>
                  ) : (
                    <span>{word} </span>
                  );
                })}
          </p>
          <div
            style={{
              position: "absolute",
              bottom: "1rem",
              left: "2rem",
              right: "2rem"
            }}
          >
            <Slider
              defaultValue={words.length}
              aria-labelledby="discrete-slider"
              valueLabelDisplay="auto"
              step={1}
              onChange={handleChange}
              marks
              min={0}
              value={wordIndex}
              max={words.length}
            />
          </div>
        </>
      </div>
    </>
  );
}
