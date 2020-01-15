import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Router } from "@reach/router";

import { AppContextProvider } from "./AppContext";
import Verses from "./Verses";
import Verse from "./Verse";

import "./App.css";

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
