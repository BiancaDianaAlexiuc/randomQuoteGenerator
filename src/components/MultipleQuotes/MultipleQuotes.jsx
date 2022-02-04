import { Box, CircularProgress } from "@mui/material";

const MultipleQuotes = ({ isLoading, author, multipleQuoteData }) => {
  return isLoading ? (
    <CircularProgress />
  ) : (
    <>
      <h1 className="author-title">{author}</h1>
      {multipleQuoteData.map((el) => {
        return (
          <Box key={el._id}>
            <ul className="app-quote-list">
              <li className="app-quote">
                <blockquote className="app-quote-text">
                  {el.quoteText}
                </blockquote>
              </li>
            </ul>
          </Box>
        );
      })}
    </>
  );
};

export default MultipleQuotes;
