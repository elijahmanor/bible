import React, { Fragment, useContext } from "react";
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
import { navigate } from "@reach/router";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Chip from '@material-ui/core/Chip';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import SettingsIcon from '@material-ui/icons/Settings';

import { AppContext } from "./AppContext";
import Progress from "./Progress";

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

export default function Verses() {
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
                  <Fragment key={verse.reference}>
                    {shouldAddHeader && (
                      <ListSubheader style={ {
                        top: "56px",
                        background: "white"
                      } }>{memo.header}</ListSubheader>
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
                        secondary={`${verse.text || "▒".repeat(28) }`}
                        secondaryTypographyProps={{ noWrap: true }}
                      />
                      { false && <Chip variant="outlined" size="small" icon={<TagFacesIcon />} /> }
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
  