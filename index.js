import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5000;
const API_KEY = process.env.API_KEY;
const SCRAPER_URL = process.env.SCRAPER_URL;

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Amazon Scraper API, ask question here");
});

app.get("/products/:productId", async (req, res) => {
  try {
    const { productId } = req.params;

    const response = await axios.get(SCRAPER_URL, {
      params: {
        api_key: API_KEY,
        url: `https://www.amazon.com/dp/${productId}`,
      },
    });
    res.json(response.data);
  } catch (error) {
    res.json(error);
  }
});

app.get("/products/:productId/reviews", async (req, res) => {
  try {
    const { productId } = req.params;

    const response = await axios.get(SCRAPER_URL, {
      params: {
        api_key: API_KEY,
        url: `https://www.amazon.com/product-reviews/${productId}`,
      },
    });

    res.status(200).json(response.data)
  } catch (error) {
    res.status(400).json(error)
  }
});

app.get("/products/:productId/offers", async (req, res) => {
    try {
      const { productId } = req.params;
  
      const response = await axios.get(SCRAPER_URL, {
        params: {
          api_key: API_KEY,
          url: `https://www.amazon.com/gp/offer-listing/${productId}`,
        },
      });
  
      res.status(200).json(response.data)
    } catch (error) {
      res.status(400).json(error)
    }
  });

  app.get("/search/:query", async (req, res) => {
    try {
      const { query } = req.params;
  
      const response = await axios.get(SCRAPER_URL, {
        params: {
          api_key: API_KEY,
          url: `https://www.amazon.com/s?k=${encodeURIComponent(query)}`,
        },
      });
  
      res.status(200).json(response.data)
    } catch (error) {
      res.status(400).json(error)
    }
  });

  app.listen(process.env.PORT || 5000, () => 
    console.log(`Server ready on port ${process.env.PORT || 5000}`)
  );