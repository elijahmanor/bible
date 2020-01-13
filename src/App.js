import React, {
  createContext,
  Fragment,
  useState,
  useEffect,
  useRef,
  useReducer,
  useContext
} from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import { Router, Link, navigate } from "@reach/router";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import LooksOneIcon from "@material-ui/icons/LooksOne";
import LooksTwoIcon from "@material-ui/icons/LooksTwo";
import LooksThreeIcon from "@material-ui/icons/Looks3";
import LooksFourIcon from "@material-ui/icons/Looks4";
import PauseCircleFilledIcon from "@material-ui/icons/PauseCircleFilled";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import { sampleSize, sortedUniq, uniq, shuffle } from "lodash";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import TextFormatIcon from "@material-ui/icons/TextFormat";
import TouchAppIcon from "@material-ui/icons/TouchApp";
import KeyboardIcon from "@material-ui/icons/Keyboard";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SettingsIcon from "@material-ui/icons/Settings";
import Badge from "@material-ui/core/Badge";
import Slider from "@material-ui/core/Slider";
import TuneIcon from "@material-ui/icons/Tune";

import "./App.css";

const APPLICATION_KEY =
  "Authorization: Token ac5dbbb40e770d62bbfdcfe1e6d45aa36df5e970";

const DATA = {
  planType: "plan51", // "plan51" or "plan31"
  answerType: "touch", // "keyboard" or "touch"
  verses: [
    {
      book: "Ephesians",
      chapter: "1",
      verse: "1",
      reference: "eph.1.1",
      plan51: {
        start: "2020-01-05T06:00:00.000Z",
        end: "2020-01-11T06:00:00.000Z",
        title: "January 5-11"
      },
      text:
        "Paul, an apostle of Christ Jesus by the will of God, To the saints who are in Ephesus, and are faithful in Christ Jesus: ",
      url: "https://my.bible.com/bible/59/EPH.1.1",
      progress: [
        { gameIndex: 0, complete: false, count: 0 },
        { gameIndex: 1, complete: false, count: 0 },
        { gameIndex: 2, complete: false, count: 0 },
        { gameIndex: 3, complete: false, count: 0 },
        { gameIndex: 4, complete: false, count: 0 }
      ]
    },
    {
      book: "Ephesians",
      chapter: "1",
      verse: "2",
      reference: "eph.1.2",
      plan51: {
        start: "2020-01-05T06:00:00.000Z",
        end: "2020-01-11T06:00:00.000Z",
        title: "January 5-11"
      },
      text:
        "Grace to you and peace from God our Father and the Lord Jesus Christ. ",
      url: "https://my.bible.com/bible/59/EPH.1.2",
      progress: [
        { gameIndex: 0, complete: false, count: 0 },
        { gameIndex: 1, complete: false, count: 0 },
        { gameIndex: 2, complete: false, count: 0 },
        { gameIndex: 3, complete: false, count: 0 },
        { gameIndex: 4, complete: false, count: 0 }
      ]
    },
    {
      book: "Ephesians",
      chapter: "1",
      verse: "3",
      reference: "eph.1.3",
      plan51: {
        start: "2020-01-05T06:00:00.000Z",
        end: "2020-01-11T06:00:00.000Z",
        title: "January 5-11"
      },
      text:
        "Blessed be the God and Father of our Lord Jesus Christ, who has blessed us in Christ with every spiritual blessing in the heavenly places, ",
      url: "https://my.bible.com/bible/59/EPH.1.3",
      progress: [
        { gameIndex: 0, complete: false, count: 0 },
        { gameIndex: 1, complete: false, count: 0 },
        { gameIndex: 2, complete: false, count: 0 },
        { gameIndex: 3, complete: false, count: 0 },
        { gameIndex: 4, complete: false, count: 0 }
      ]
    },

    {
      book: "Ephesians",
      chapter: "1",
      verse: "4",
      reference: "eph.1.4",
      plan51: {
        start: "2020-01-12T06:00:00.000Z",
        end: "2020-01-18T06:00:00.000Z",
        title: "January 12-18"
      },
      text:
        "even as he chose us in him before the foundation of the world, that we should be holy and blameless before him. In love ",
      url: "https://my.bible.com/bible/59/EPH.1.4",
      progress: [
        { gameIndex: 0, complete: false, count: 0 },
        { gameIndex: 1, complete: false, count: 0 },
        { gameIndex: 2, complete: false, count: 0 },
        { gameIndex: 3, complete: false, count: 0 },
        { gameIndex: 4, complete: false, count: 0 }
      ]
    },
    {
      book: "Ephesians",
      chapter: "1",
      verse: "5",
      reference: "eph.1.5",
      plan51: {
        start: "2020-01-12T06:00:00.000Z",
        end: "2020-01-18T06:00:00.000Z",
        title: "January 12-18"
      },
      text:
        "he predestined us for adoption to himself as sons through Jesus Christ, according to the purpose of his will, ",
      url: "https://my.bible.com/bible/59/EPH.1.5",
      progress: [
        { gameIndex: 0, complete: false, count: 0 },
        { gameIndex: 1, complete: false, count: 0 },
        { gameIndex: 2, complete: false, count: 0 },
        { gameIndex: 3, complete: false, count: 0 },
        { gameIndex: 4, complete: false, count: 0 }
      ]
    },
    {
      book: "Ephesians",
      chapter: "1",
      verse: "6",
      reference: "eph.1.6",
      plan51: {
        start: "2020-01-12T06:00:00.000Z",
        end: "2020-01-18T06:00:00.000Z",
        title: "January 12-18"
      },
      text:
        "to the praise of his glorious grace, with which he has blessed us in the Beloved. ",
      url: "https://my.bible.com/bible/59/EPH.1.6",
      progress: [
        { gameIndex: 0, complete: false, count: 0 },
        { gameIndex: 1, complete: false, count: 0 },
        { gameIndex: 2, complete: false, count: 0 },
        { gameIndex: 3, complete: false, count: 0 },
        { gameIndex: 4, complete: false, count: 0 }
      ]
    },

    {
      book: "Ephesians",
      chapter: "1",
      verse: "7",
      reference: "eph.1.7",
      plan51: {
        start: "2020-01-19T06:00:00.000Z",
        end: "2020-01-25T06:00:00.000Z",
        title: "January 19-25"
      },
      text:
        "In him we have redemption through his blood, the forgiveness of our trespasses, according to the riches of his grace, ",
      url: "https://my.bible.com/bible/59/EPH.1.7",
      progress: [
        { gameIndex: 0, complete: false, count: 0 },
        { gameIndex: 1, complete: false, count: 0 },
        { gameIndex: 2, complete: false, count: 0 },
        { gameIndex: 3, complete: false, count: 0 },
        { gameIndex: 4, complete: false, count: 0 }
      ]
    },
    {
      book: "Ephesians",
      chapter: "1",
      verse: "8",
      reference: "eph.1.8",
      plan51: {
        start: "2020-01-19T06:00:00.000Z",
        end: "2020-01-25T06:00:00.000Z",
        title: "January 19-25"
      },
      text: "which he lavished upon us, in all wisdom and insight ",
      url: "https://my.bible.com/bible/59/EPH.1.8",
      progress: [
        { gameIndex: 0, complete: false, count: 0 },
        { gameIndex: 1, complete: false, count: 0 },
        { gameIndex: 2, complete: false, count: 0 },
        { gameIndex: 3, complete: false, count: 0 },
        { gameIndex: 4, complete: false, count: 0 }
      ]
    },
    {
      book: "Ephesians",
      chapter: "1",
      verse: "9",
      reference: "eph.1.9",
      plan51: {
        start: "2020-01-19T06:00:00.000Z",
        end: "2020-01-25T06:00:00.000Z",
        title: "January 19-25"
      },
      text:
        "making known to us the mystery of his will, according to his purpose, which he set forth in Christ ",
      url: "https://my.bible.com/bible/59/EPH.1.9",
      progress: [
        { gameIndex: 0, complete: false, count: 0 },
        { gameIndex: 1, complete: false, count: 0 },
        { gameIndex: 2, complete: false, count: 0 },
        { gameIndex: 3, complete: false, count: 0 },
        { gameIndex: 4, complete: false, count: 0 }
      ]
    }
  ]
};

const AppContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "complete":
      const verse = state.verses.find(v => v.reference === action.reference);
      verse.progress = verse.progress.map(game => {
        if (game.gameIndex === action.gameIndex) {
          game.complete = true;
          game.count += 1;
        }
        return game;
      });
      const newState = { ...state };
      window.localStorage.setItem("data", JSON.stringify(newState, null, 2));
      return newState;
    case "switchAnswerType": {
      const newState = { ...state, answerType: action.answerType };
      window.localStorage.setItem("data", JSON.stringify(newState, null, 2));
      return newState;
    }
    case "reset": {
      const newState = { ...DATA };
      window.localStorage.setItem("data", JSON.stringify(newState, null, 2));
      return newState;
    }
    default: {
      const newState = { ...state };
      window.localStorage.setItem("data", JSON.stringify(newState, null, 2));
      return newState;
    }
  }
};

const getData = defaultVerses => {
  const data = window.localStorage.getItem("data");
  return data ? JSON.parse(data) : defaultVerses;
};

const AppContextProvider = props => {
  const [state, dispatch] = useReducer(reducer, DATA, getData);
  const value = { state, dispatch };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

// https://codepen.io/xgad/post/svg-radial-progress-meters
function Progress({
  width = 120,
  height = 120,
  strokeWidth = 12,
  fontSize = 20,
  percentage = 40,
  text = ""
}) {
  const radius = width / 2 - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const offset = (circumference * (100 - percentage)) / 100;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <g transform={`rotate(-90 ${width / 2} ${height / 2})`}>
        <circle
          cx={width / 2}
          cy={height / 2}
          r={radius}
          fill="none"
          stroke="#ccc"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={width / 2}
          cy={height / 2}
          r={radius}
          fill="none"
          stroke="#3f51b5"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "all 600ms ease-in-out" }}
        />
      </g>
      {text ? (
        <text
          x={width / 2}
          y={height / 2}
          fontSize={fontSize}
          dominantBaseline="middle"
          textAnchor="middle"
          style={{
            fontFeatureSettings: "tnum",
            fontVariantNumeric: "tabular-nums"
          }}
        >
          {text}
        </text>
      ) : null}
      />
    </svg>
  );
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

function Verses() {
  const classes = useStyles();
  const { state, dispatch } = useContext(AppContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleReset = () => {
    dispatch({ type: "reset" });
    handleClose();
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuBookIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Memorize
          </Typography>
          {/* <IconButton color="inherit">
            <FormatListNumberedIcon />
          </IconButton> */}
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <SettingsIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleReset}>Reset Stats</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>

      <List className={classes.offset}>
        {
          state.verses.reduce(
            (memo, verse, index) => {
              const shouldAddHeader =
                verse.plan51.title !== memo.header ? verse.plan51.title : "";
              if (shouldAddHeader) {
                memo.header = verse.plan51.title;
              }
              const gamesComplete = verse.progress.reduce((memo, game) => {
                memo += game.complete ? 1 : 0;
                return memo;
              }, 0);
              memo.verses.push(
                <Fragment>
                  {shouldAddHeader && (
                    <ListSubheader>{memo.header}</ListSubheader>
                  )}
                  <ListItem
                    alignItems="flex-start"
                    button
                    onClick={() => navigate(`/verse/${verse.reference}`)}
                  >
                    <ListItemAvatar>
                      <Progress
                        width={40}
                        height={40}
                        strokeWidth={5}
                        percentage={
                          (gamesComplete / verse.progress.length) * 100
                        }
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${verse.book} ${verse.chapter}:${verse.verse}`}
                      secondary={`${verse.text}`}
                      secondaryTypographyProps={{ noWrap: true }}
                    />
                  </ListItem>
                  <Divider component="li" />
                </Fragment>
              );
              return memo;
            },
            { verses: [], header: "" }
          ).verses
        }
      </List>
    </>
  );
}

function Game({ verse, gameIndex, answerType, onComplete }) {
  const classes = useStyles();
  const [wordIndex, setWordIndex] = useState(0);
  const [guess, setGuess] = useState("");
  const [correct, setCorrect] = useState(false);
  const [complete, setComplete] = useState(false);
  const typing = useRef();
  const words = verse.text.split(" ").filter(w => w);
  const [fillInTheBlanks, setFillInTheBlanks] = useState([]);
  const [wordBank, setWordBank] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState([]);

  useEffect(() => {
    const words = verse.text.split(" ");
    let cleanedWords = words
      .map(word => word.replace(/\W/g, ""))
      .filter(w => w);

    let answer = words[wordIndex].replace(/\W/g, "");
    if (
      gameIndex === 3 &&
      fillInTheBlanks.length &&
      wordIndex < fillInTheBlanks.length
    ) {
      // debugger;
      answer = words[fillInTheBlanks[wordIndex]].replace(/\W/g, "");
    }

    cleanedWords = uniq(cleanedWords).filter(w => w !== answer);
    cleanedWords = sampleSize(cleanedWords, 9);
    cleanedWords.push(answer);
    cleanedWords = shuffle(cleanedWords);
    setWordBank(cleanedWords);
  }, [wordIndex, verse.text, fillInTheBlanks, gameIndex]);

  useEffect(() => {
    if (gameIndex === 3) {
      const sample = sampleSize(
        Array.from(new Array(words.length), (_, i) => i),
        5
      );
      sample.sort(function(a, b) {
        return a - b;
      });
      setFillInTheBlanks(sample);
    }
    setWordIndex(0);
  }, [gameIndex, words.length]);

  const handleInput = e => {
    const letter = e.target.value[0].toUpperCase();
    setGuess(letter);

    if (gameIndex === 1 || gameIndex === 2 || gameIndex === 4) {
      const isCorrect = words[wordIndex][0].toUpperCase() === letter;
      setCorrect(isCorrect);
      if (isCorrect && wordIndex <= words.length - 1) {
        setWordIndex(wordIndex + 1);
      }
    } else if (gameIndex === 3) {
      const isCorrect =
        words[fillInTheBlanks[wordIndex]][0].toUpperCase() === letter;
      setCorrect(isCorrect);
      if (isCorrect && wordIndex <= fillInTheBlanks.length - 1) {
        setWordIndex(wordIndex + 1);
      }
    }

    typing.current.value = "";
    window.setTimeout(() => setGuess(""), 1000); // TODO: Make this better
  };

  const handleClick = guess => {
    if (gameIndex === 1 || gameIndex === 2 || gameIndex === 4) {
      const answer = words[wordIndex].replace(/\W/g, "");
      if (guess === answer) {
        setWordIndex(wordIndex + 1);
        setWrongGuesses([]);
      } else {
        setWrongGuesses([...wrongGuesses, guess]);
      }
    } else if (gameIndex === 3) {
      const answer = words[fillInTheBlanks[wordIndex]].replace(/\W/g, "");
      if (guess === answer) {
        setWordIndex(wordIndex + 1);
        setWrongGuesses([]);
      } else {
        setWrongGuesses([...wrongGuesses, guess]);
      }
    }
  };

  useEffect(() => {
    if (gameIndex === 1 || gameIndex === 2 || gameIndex === 4) {
      if (wordIndex >= words.length) {
        setComplete(true);
      }
    } else if (gameIndex === 3) {
      if (fillInTheBlanks.length && wordIndex >= fillInTheBlanks.length) {
        setComplete(true);
      }
    }
  }, [setComplete, wordIndex, words.length, gameIndex, fillInTheBlanks.length]);

  useEffect(() => {
    if (answerType === "keyboard") {
      typing.current.focus();
    }
  });

  return (
    <Fragment>
      <p style={{ fontSize: "1.25rem" }}>
        {gameIndex === 1 &&
          words.map((word, i) => (
            <span style={{ color: i >= wordIndex ? "#ccc" : "#000" }}>
              {word}{" "}
            </span>
          ))}
        {gameIndex === 2 &&
          words.map((word, i) => {
            const [firstLetter, ...rest] = word.split("");
            return i >= wordIndex ? (
              <span>
                <span>{firstLetter}</span>
                <span
                  style={{
                    color: "transparent",
                    borderBottom: "1px solid black"
                  }}
                >
                  {rest.join("")}
                </span>{" "}
              </span>
            ) : (
              <span>
                <span
                  style={{
                    borderBottom: "1px solid black"
                  }}
                >
                  {word}
                </span>{" "}
              </span>
            );
          })}
        {gameIndex === 3 &&
          words.map((word, i) => {
            return fillInTheBlanks.includes(i) ? (
              i >= fillInTheBlanks[wordIndex] ? (
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
                <span>
                  <span
                    style={{
                      borderBottom: "1px solid black"
                    }}
                  >
                    {word}
                  </span>{" "}
                </span>
              )
            ) : (
              <span>{word} </span>
            );
          })}
        {gameIndex === 4 &&
          words.map((word, i) => {
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
      {guess && (
        <div
          style={{
            position: "absolute",
            bottom: "2rem",
            left: "50%",
            transform: "translateX(-50%)",
            background: correct ? "#3f51b5" : "red",
            width: "2.5rem",
            height: "2.5rem",
            borderRadius: "50%",
            lineHeight: "2.5rem",
            textAlign: "center",
            color: "white",
            fontSize: "1.5rem"
          }}
        >
          {guess}
        </div>
      )}
      {answerType === "keyboard" ? (
        <input
          ref={typing}
          autoFocus
          onChange={handleInput}
          style={{
            width: "5px",
            height: "5px",
            position: "absolute",
            left: "-1000px"
          }}
        />
      ) : (
        !complete && (
          <div
            className={classes.buttonMargin}
            style={{
              position: "absolute",
              bottom: "1rem",
              left: "1rem",
              right: "1rem"
            }}
          >
            {wordBank.map(word => (
              <Button
                variant="outlined"
                color={wrongGuesses.includes(word) ? "secondary" : "primary"}
                onClick={() => handleClick(word)}
              >
                {word}
              </Button>
            ))}
          </div>
        )
      )}
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={complete}
        autoHideDuration={1500}
        onClose={onComplete}
      >
        <SnackbarContent
          className=""
          aria-describedby="client-snackbar"
          message={<span id="client-snackbar">{"Congrats!"}</span>}
        />
      </Snackbar>
    </Fragment>
  );
}

function Verse(props) {
  const classes = useStyles();
  const [isPlayButton, setIsPlayButton] = useState(true);
  const [gameIndex, setGameIndex] = useState(0);
  const { state, dispatch } = useContext(AppContext);
  const verse = state.verses.find(v => v.reference === props.reference);
  const words = verse.text.split(" ").filter(w => w);
  const [wordIndex, setWordIndex] = useState(words.length - 1);

  const handleChange = (obj, val) => {
    setWordIndex(val);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => navigate(`/`)}
          >
            <ArrowBackIosIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Memorize
          </Typography>
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

      <div style={{ margin: "1rem" }} contentEditable={false}>
        <h2>{`${verse.book} ${verse.chapter}:${verse.verse}`}</h2>
        {gameIndex === 0 ? (
          <>
            <p style={{ fontSize: "1.25rem" }}>
              {wordIndex >= words.length - 1
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
                defaultValue={words.length - 1}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                step={1}
                onChange={handleChange}
                marks
                min={0}
                max={words.length - 1}
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
        <IconButton>
          <TuneIcon
            style={{
              borderBottom: gameIndex === 0 ? "3px solid #f50057" : "none"
            }}
            onClick={() => {
              setGameIndex(0);
            }}
          />
        </IconButton>
        <IconButton
          color={verse.progress[0].complete ? "primary" : ""}
          aria-label="upload picture"
          component="span"
          onClick={
            isPlayButton
              ? () => {
                  setIsPlayButton(false);
                  var msg = new SpeechSynthesisUtterance(verse.text);
                  msg.addEventListener("end", () => {
                    setIsPlayButton(true);
                    dispatch({
                      type: "complete",
                      reference: props.reference,
                      gameIndex: 0
                    });
                  });
                  window.speechSynthesis.speak(msg);
                }
              : null
          }
        >
          <Badge
            badgeContent={
              verse.progress[0].count >= 2 ? verse.progress[0].count : 0
            }
            color="secondary"
            overlap="circle"
          >
            {isPlayButton ? (
              <PlayCircleFilledIcon fontSize="large" />
            ) : (
              <PauseCircleFilledIcon fontSize="large" />
            )}
          </Badge>
        </IconButton>
        <IconButton
          color={verse.progress[1].complete ? "primary" : ""}
          aria-label="upload picture"
          component="span"
          onClick={() => {
            setGameIndex(1);
          }}
        >
          <Badge
            badgeContent={
              verse.progress[1].count >= 2 ? verse.progress[1].count : 0
            }
            color="secondary"
            overlap="circle"
          >
            <LooksOneIcon
              fontSize="large"
              style={{
                borderBottom: gameIndex === 1 ? "3px solid #f50057" : "none"
              }}
            />
          </Badge>
        </IconButton>
        <IconButton
          color={verse.progress[2].complete ? "primary" : ""}
          aria-label="upload picture"
          component="span"
          onClick={() => {
            setGameIndex(2);
          }}
        >
          <Badge
            badgeContent={
              verse.progress[2].count >= 2 ? verse.progress[2].count : 0
            }
            color="secondary"
            overlap="circle"
          >
            <LooksTwoIcon
              fontSize="large"
              style={{
                borderBottom: gameIndex === 2 ? "3px solid #f50057" : "none"
              }}
            />
          </Badge>
        </IconButton>
        <IconButton
          color={verse.progress[3].complete ? "primary" : ""}
          aria-label="upload picture"
          component="span"
          onClick={() => {
            setGameIndex(3);
          }}
        >
          <Badge
            badgeContent={
              verse.progress[3].count >= 2 ? verse.progress[3].count : 0
            }
            color="secondary"
            overlap="circle"
          >
            <LooksThreeIcon
              fontSize="large"
              style={{
                borderBottom: gameIndex === 3 ? "3px solid #f50057" : "none"
              }}
            />
          </Badge>
        </IconButton>
        <IconButton
          color={verse.progress[4].complete ? "primary" : ""}
          aria-label="upload picture"
          component="span"
          onClick={() => {
            setGameIndex(4);
          }}
        >
          <Badge
            badgeContent={
              verse.progress[4].count >= 2 ? verse.progress[4].count : 0
            }
            color="secondary"
            overlap="circle"
          >
            <LooksFourIcon
              fontSize="large"
              style={{
                borderBottom: gameIndex === 4 ? "3px solid #f50057" : "none"
              }}
            />
          </Badge>
        </IconButton>
      </div>
    </>
  );
}

function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppContextProvider>
        <Router>
          <Verses path="/" />
          <Verse path="verse/:reference" />
        </Router>
      </AppContextProvider>
    </div>
  );
}

export default App;
