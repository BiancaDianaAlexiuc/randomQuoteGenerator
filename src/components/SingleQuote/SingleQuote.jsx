import { Button, Box, CircularProgress } from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { toJS } from "mobx";

const SingleQuote = ({ isLoading, singleQuoteData, handleMultipleQuotes }) => {
  return isLoading ? (
    <CircularProgress />
  ) : (
    <>
      {singleQuoteData.map((el) => {
        return (
          <Box
            key={el._id}
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <ul className="app-quote-list">
              <li className="app-quote">
                <p className="app-quote-text">"{el.quoteText}"</p>
              </li>
            </ul>
            <Button
              className="app-quote-all"
              variant="text"
              onClick={handleMultipleQuotes(el.quoteAuthor)}
              sx={{
                textTransform: "capitalize",
                width: "620px",
                display: "flex",
                justifyContent: "space-between",
                padding: "30px",
                ":hover": { backgroundColor: "#333333" },
              }}
              endIcon={
                <ArrowRightAltIcon sx={{ color: "#ffffff", fontSize: 60 }} />
              }
            >
              <span className="app-quote-author">
                {el.quoteAuthor}
                <span className="app-quote-genre">{el.quoteGenre}</span>
              </span>
            </Button>
          </Box>
        );
      })}
    </>
  );
};

export default SingleQuote;
