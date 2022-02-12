import { useEffect, useState } from "react";
import { observer } from "mobx-react";

import "./App.scss";

import { Button } from "@mui/material";
import AutorenewOutlinedIcon from "@mui/icons-material/AutorenewOutlined";

import MultipleQuotes from "./components/MultipleQuotes/MultipleQuotes";
import SingleQuote from "./components/SingleQuote/SingleQuote";

import storeQ from "../src/quotesStore";
import storeA from "./authorStore";

const App = () => {
  const [multipleAuthorsBoolean, setMultipleAuthorBoolean] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    storeQ.loadQuotes(
      "https://quote-garden.herokuapp.com/api/v3/quotes/random"
    );
  };

  const getQuotesByAuthor = (author) => {
    storeA.loadMultipleQuotes(
      `https://quote-garden.herokuapp.com/api/v3/quotes?author=${author}`
    );
  };

  const handleRandomQuote = () => {
    getData();
    setMultipleAuthorBoolean(false);
  };

  const handleMultipleQuotes = (authorName) => (e) => {
    setMultipleAuthorBoolean(true);
    getQuotesByAuthor(authorName);
  };

  return (
    <div className="app">
      <header className="app-header">
        <Button
          onClick={handleRandomQuote}
          sx={{
            fontFamily: "Raleway",
            fontStyle: "normal",
            fontWeight: 500,
            fontSize: "18px",
            lineHeight: "120%",
            color: "#4f4f4f",
            textTransform: "capitalize",
          }}
          variant="text"
          endIcon={<AutorenewOutlinedIcon sx={{ color: "#4f4f4f" }} />}
        >
          random
        </Button>
      </header>

      <div className="app-content">
        {multipleAuthorsBoolean ? (
          <MultipleQuotes
            isLoading={storeA.isLoading}
            author={storeQ.author}
            multipleQuoteData={storeA.multipleQuotes}
          />
        ) : (
          <SingleQuote
            isLoading={storeQ.isLoading}
            singleQuoteData={storeQ.quotes}
            handleMultipleQuotes={handleMultipleQuotes}
          />
        )}
      </div>

      <footer className="app-footer">
        <p className="app-creator">created by Alexiuc Bianca Diana</p>
      </footer>
    </div>
  );
};

export default observer(App);
