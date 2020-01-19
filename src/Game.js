import React, { useRef, Fragment, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import { sampleSize, uniq, shuffle } from "lodash";
import Button from "@material-ui/core/Button";
import FallingWords from "./FallingWords";

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

export default function Game({ verse, gameIndex, answerType, onComplete }) {
  const classes = useStyles();
  const [wordIndex, setWordIndex] = useState(0);
  const [guess, setGuess] = useState("");
  const [correct, setCorrect] = useState(false);
  const [complete, setComplete] = useState(false);
  const typing = useRef();
  const words = verse.text
    .trim()
    .split(/\s+/)
    .filter(w => w);
  const [fillInTheBlanks, setFillInTheBlanks] = useState([]);
  const [wordBank, setWordBank] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState([]);
  const myRef = useRef();
  const width = myRef.current
    ? parseInt(window.getComputedStyle(myRef.current).width, 10)
    : 0;

  useEffect(() => {
    const words = verse.text.trim().split(/\s+/) || [];
    let cleanedWords = words
      .map(word => word.replace(/\W/g, ""))
      .filter(w => w);

    let answer =
      wordIndex < words.length ? words[wordIndex].replace(/\W/g, "") : "";
    if (
      gameIndex === 2 &&
      fillInTheBlanks.length &&
      wordIndex < fillInTheBlanks.length
    ) {
      answer = words[fillInTheBlanks[wordIndex]].replace(/\W/g, "");
    }

    cleanedWords = uniq(cleanedWords).filter(
      w => w.toUpperCase() !== answer.toUpperCase()
    );
    cleanedWords = sampleSize(cleanedWords, 9);
    cleanedWords.push(answer);
    // cleanedWords = shuffle(cleanedWords);
    cleanedWords.sort(function(a, b) {
      return a.toLowerCase().localeCompare(b.toLowerCase());
    });
    setWordBank(cleanedWords);
  }, [wordIndex, verse.text, fillInTheBlanks, gameIndex]);

  useEffect(() => {
    if (gameIndex === 2) {
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

    if (gameIndex === 0 || gameIndex === 1 || gameIndex === 4) {
      const isCorrect = words[wordIndex][0].toUpperCase() === letter;
      setCorrect(isCorrect);
      if (isCorrect && wordIndex <= words.length - 1) {
        setWordIndex(wordIndex + 1);
      }
    } else if (gameIndex === 2) {
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
    if (gameIndex === 0 || gameIndex === 1 || gameIndex === 4) {
      const answer = words[wordIndex].replace(/\W/g, "");
      if (guess === answer) {
        setWordIndex(wordIndex + 1);
        setWrongGuesses([]);
      } else {
        setWrongGuesses([...wrongGuesses, guess]);
      }
    } else if (gameIndex === 2) {
      const answer = words[fillInTheBlanks[wordIndex]].replace(/\W/g, "");
      if (guess === answer) {
        setWordIndex(wordIndex + 1);
        setWrongGuesses([]);
      } else {
        setWrongGuesses([...wrongGuesses, guess]);
      }
    } else if (gameIndex === 3) {
      setGuess(guess);
    }
  };

  const handleWordIndexChange = index => {
    setWordIndex(index);
  };

  useEffect(() => {
    if (gameIndex === 0 || gameIndex === 1 || gameIndex === 4) {
      if (wordIndex >= words.length) {
        setComplete(true);
      }
    } else if (gameIndex === 2) {
      if (fillInTheBlanks.length && wordIndex >= fillInTheBlanks.length) {
        setComplete(true);
      }
    }
  }, [setComplete, wordIndex, words.length, gameIndex, fillInTheBlanks.length]);

  useEffect(() => {
    if (answerType === "keyboard") {
      typing.current.focus();
    } else {
      setGuess("");
    }
  }, [answerType, gameIndex]);

  return (
    <Fragment>
      <p ref={myRef} style={{ fontSize: "1.25rem" }}>
        {gameIndex === 0 &&
          words.map((word, i) => (
            <span style={{ color: i >= wordIndex ? "#ccc" : "#000" }}>
              {word}{" "}
            </span>
          ))}
        {gameIndex === 1 &&
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
        {gameIndex === 2 &&
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
        {gameIndex === 3 && width && (
          <FallingWords
            words={words}
            width={width}
            guess={guess}
            onWordIndexChange={handleWordIndexChange}
            onComplete={() => {
              setComplete(true);
              console.log("SUCCESS");
            }}
            onFailure={() => {
              console.log("FAIL");
            }}
          />
        )}
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
      {guess && gameIndex !== 3 && (
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
