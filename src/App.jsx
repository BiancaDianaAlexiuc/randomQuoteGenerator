import { useEffect, useState } from "react";
import axios from "axios";

import "./App.scss";

import { Button } from "@mui/material";
import AutorenewOutlinedIcon from "@mui/icons-material/AutorenewOutlined";

import MultipleQuotes from "./components/MultipleQuotes/MultipleQuotes";
import SingleQuote from "./components/SingleQuote/SingleQuote";

const App = () => {
  const [author, setAuthor] = useState("");
  const [singleQuoteData, setSingleQuoteData] = useState([]);
  const [multipleQuoteData, setMultipleOuoteData] = useState([]);
  const [multipleAuthorsBoolean, setMultipleAuthorBoolean] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      await axios(
        "https://quote-garden.herokuapp.com/api/v3/quotes/random"
      ).then((response) => {
        const authorText = response.data.data;
        setSingleQuoteData(response.data.data);
        authorText.map((el) => {
          setAuthor(el.quoteAuthor);
        });
        setLoading(false);
      });
    } catch (e) {
      console.log(e);
    }
  }

  async function getQuotesByAuthor(author) {
    try {
      await axios(
        `https://quote-garden.herokuapp.com/api/v3/quotes?author=${author}`
      ).then((response) => {
        console.log(response.data);
        setMultipleOuoteData(response.data.data);
        setLoading(false);
      });
    } catch (e) {
      console.log(e);
    }
  }

  const handleRandomQuote = () => {
    getData();
    setMultipleAuthorBoolean(false);
  };

  const handleMultipleQuotes = (authorName) => (e) => {
    console.log(authorName);
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
            isLoading={isLoading}
            author={author}
            multipleQuoteData={multipleQuoteData}
          />
        ) : (
          <SingleQuote
            isLoading={isLoading}
            singleQuoteData={singleQuoteData}
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

export default App;
