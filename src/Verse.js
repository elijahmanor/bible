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
  import GameIcon from "./GameIcon";

  const APPLICATION_KEY =
  "Token ac5dbbb40e770d62bbfdcfe1e6d45aa36df5e970";

const getVerse = async reference => {
  const url = new URL("https://api.esv.org/v3/passage/text/");
  const params = {
    q: reference,
    "include-headings": false,
    "include-footnotes": false,
    "include-verse-numbers": false,
    "include-short-copyright": false,
    "include-passage-references": false
  };
  Object.keys(params).forEach(key =>
    url.searchParams.append(key, params[key])
  );
  const response = await window
    .fetch(url, {
      headers: new Headers({
        Authorization: APPLICATION_KEY
      })
    });
  const data = await response.json();
  return data.passages;
}

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
  
export default function Verse(props) {
    const classes = useStyles();
    const [isPlayButton, setIsPlayButton] = useState(true);
    const [gameIndex, setGameIndex] = useState(0);
    const { state, dispatch } = useContext(AppContext);
    const verse = state.verses.find(v => v.reference === props.reference);
    const words = verse.text.split(" ").filter(w => w);
    const [wordIndex, setWordIndex] = useState(words.length);
  
    useEffect( () => {
        async function fetchData() {
            if (!verse.text) {
                const passages = await getVerse(verse.reference);
                if (passages && passages[0]) {
                    const text = passages[0]; 
                    const words = text.split(" ").filter(w => w);
                    setWordIndex(words.length)
                    dispatch( { type: "updateText", reference: props.reference, text } )
                }
            }
              }
          fetchData();
    }, [verse.text]);

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
                      var msg = new SpeechSynthesisUtterance(verse.text);
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
            <IconButton
              color="inherit"
              onClick={() => {
                dispatch({
                  type: "switchAnswerType",
                  answerType:
                    state.answerType === "keyboard" ? "touch" : "keyboard"
                });
              }}
            >
              {state.answerType === "touch" ? <KeyboardIcon /> : <TouchAppIcon />}
            </IconButton>
          </Toolbar>
        </AppBar>
  
        <div style={{ margin: "0 1rem" }} contentEditable={false}>
          <IconButton onClick={() => {
            setGameIndex(0);
          }}>
            <TuneIcon
              style={{
                borderBottom: gameIndex === 0 ? "3px solid #f50057" : "3px solid transparent"
              }}
            />
          </IconButton>
          <GameIcon verse={verse} setGameIndex={ setGameIndex } currentGameIndex={ gameIndex } gameIndex={ 1 } Icon={LooksOneIcon} />
          <GameIcon verse={verse} setGameIndex={ setGameIndex } currentGameIndex={ gameIndex } gameIndex={ 2 } Icon={LooksTwoIcon} />
          <GameIcon verse={verse} setGameIndex={ setGameIndex } currentGameIndex={ gameIndex } gameIndex={ 3 } Icon={LooksThreeIcon}  />
          <GameIcon verse={verse} setGameIndex={ setGameIndex } currentGameIndex={ gameIndex } gameIndex={ 4 } Icon={LooksFourIcon} />
          <GameIcon verse={verse} setGameIndex={ setGameIndex } currentGameIndex={ gameIndex } gameIndex={ 5 } Icon={LooksFiveIcon} />
          <h2 style={{ margin: "0" }}>{`${verse.book} ${verse.chapter}:${verse.verse}`}</h2>
          {gameIndex === 0 ? (
            <>
              <p style={{ fontSize: "1.25rem" }}>
                {wordIndex >= words.length
                  ? verse.text
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
          ) : (
            <Game
              verse={verse}
              gameIndex={gameIndex}
              answerType={state.answerType}
              onComplete={() => {
                dispatch({
                  type: "complete",
                  reference: props.reference,
                  gameIndex: gameIndex
                });
                setGameIndex(0);
              }}
            />
          )}
        </div>
      </>
    );
  }
  