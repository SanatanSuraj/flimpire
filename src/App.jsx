import React from "react";
import { CssBaseline } from "@mui/material";
import { Routes, Route } from "react-router-dom";

import useStyles from "./components/styles.js";
import {
  Actors,
  Movies,
  Profile,
  NavBar,
  MovieInformation,
} from "./components";

const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Routes>
          <Route exact path="/" element={<Movies />} />
          <Route exact path="/movies" element={<MovieInformation />} />
          <Route exact path="/actors" element={<Actors />} />
          <Route exact path="/profile" element={<Profile />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
