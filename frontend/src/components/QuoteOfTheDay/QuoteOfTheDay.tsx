import React, { useEffect, useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { getQuoteOfTheDay } from "../../services/api/apiService";
import { Quote } from "../../types/quote";

const QuoteOfTheDay: React.FC = () => {
  const [quoteData, setQuoteData] = useState<Quote | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const data = await getQuoteOfTheDay();
        setQuoteData(data.quote); // Extract the nested "quote" object
      } catch (err) {
        console.error("Error fetching quote of the day:", err);
        setError("Something went wrong. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuote();
  }, []);

  return (
    <Box
      sx={{
        width: "100%", // Full width of the page
        backgroundColor: "primary.light",
        color: "primary.contrastText",
        padding: "12px 16px",
        textAlign: "center",
        borderBottom: "2px solid",
        borderColor: "secondary.main",
        boxShadow: 1,
        margin: 0,
      }}
    >
      {loading ? (
        <CircularProgress size={24} sx={{ color: "primary.contrastText" }} />
      ) : error ? (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      ) : (
        <>
          <Typography
            variant="h6"
            fontStyle="italic"
            data-testid="quote-text"
            sx={{ marginBottom: "4px" }} // Reduce spacing between quote and author
          >
            "{quoteData?.quote}"
          </Typography>
          <Typography
            variant="body2"
            color="primary.contrastText"
            data-testid="quote-author"
          >
            - {quoteData?.author}
          </Typography>
        </>
      )}
    </Box>
  );
};

export default QuoteOfTheDay;