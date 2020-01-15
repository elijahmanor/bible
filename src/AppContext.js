import React, { createContext, useReducer } from "react";
import { format, addDays, formatDistanceToNow } from "date-fns";

let EPHESIANS = [23, 22, 21, 32, 33, 24];
EPHESIANS = EPHESIANS.reduce((memo, numberOfVerses, chapterIndex) => {
  [...new Array(numberOfVerses)].forEach((_, verseIndex) => {
    memo.push({
      chapter: chapterIndex + 1,
      verse: verseIndex + 1
    });
  });
  return memo;
}, []);

let startDate = new Date("2020-01-05T06:00:00.000Z");
let endDate = addDays(startDate, 6);
EPHESIANS = EPHESIANS.map(({ chapter, verse }, index) => {
  startDate = index && index % 3 === 0 ? addDays(startDate, 7) : startDate;
  endDate = index && index % 3 === 0 ? addDays(endDate, 7) : endDate;
  return {
    book: "Ephesians",
    chapter,
    verse,
    reference: `eph.${chapter}.${verse}`,
    plan51: {
      startDate,
      endDate,
      title: `${format(startDate, "MMMM do")} - ${format(endDate, "MMMM do")}`,
      titleWithDistance: `${format(startDate, "MMMM do")} - ${format(
        endDate,
        "MMMM do"
      )} : ${formatDistanceToNow(startDate, { addSuffice: true })}`
    },
    text: "",
    url: `https://my.bible.com/bible/59/EPH.${chapter}.${verse}`,
    progress: [
      { gameIndex: 0, complete: false, count: 0 },
      { gameIndex: 1, complete: false, count: 0 },
      { gameIndex: 2, complete: false, count: 0 },
      { gameIndex: 3, complete: false, count: 0 },
      { gameIndex: 4, complete: false, count: 0 }
    ]
  };
});

console.log({ EPHESIANS });

const DATA = {
  planType: "plan51", // "plan51" or "plan31"
  answerType: "touch", // "keyboard" or "touch"
  verses: EPHESIANS
};

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
    case "updateText": {
      const verse = state.verses.find(v => v.reference === action.reference);
      verse.text = action.text;
      const newState = { ...state };
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

const AppContext = createContext();

const AppContextProvider = props => {
  const [state, dispatch] = useReducer(reducer, DATA, getData);
  const value = { state, dispatch };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
