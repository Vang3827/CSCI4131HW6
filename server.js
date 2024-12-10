const express = require('express');
const app = express();
const pug = require('pug');
const { addListing, getListing, getGallery, placeBid, deleteListing } = require('./data.js'); // Using functions from data.js

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/css', express.static('resources/css'));
app.use("/js", express.static("resources/js/"));
app.set("views", "templates");
app.set("view engine", "pug");

const port = 4131;

// Rate limit logic
let rateLimitStore = [];
const RATE_LIMIT = 4; // Max requests
const RATE_LIMIT_WINDOW = 10; // Window in seconds

const checkRateLimit = () => {
  const now = new Date();
  rateLimitStore = rateLimitStore.filter(time =>
    (now - time) <= RATE_LIMIT_WINDOW * 1000
  );

  if (rateLimitStore.length >= RATE_LIMIT) {
    const oldestRequest = rateLimitStore[0];
    const retryAfter = RATE_LIMIT_WINDOW - ((now - oldestRequest) / 1000);
    return { passed: false, retryAfter };
  }

  rateLimitStore.push(now);
  return { passed: true };
};

app.use('/api/', (req, res, next) => {
  const { passed, retryAfter } = checkRateLimit();

  if (!passed) {
    res.setHeader('Retry-After', retryAfter);
    return res.status(429).json({
      message: `Rate limit exceeded. Try again in ${retryAfter.toFixed(2)} seconds.`
    });
  }

  next();
});

app.get("/", (req, res) => {
  res.render("main.pug");
});

app.get("/gallery", async (req, res) => {
  const queryTerm = req.query.query || '';
  const category = req.query.category || '';

  try {
    const tempListing = await getGallery(queryTerm, category);
    res.render('gallery', { tempListing });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching listings from the database.");
  }
});

app.get('/api/gallery', async (req, res) => {
  const queryTerm = req.query.query || '';  // Get query parameter for search
  const category = req.query.category || ''; // Get category parameter

  try {
    // Fetch listings from the database using getGallery
    const listings = await getGallery(queryTerm, category);
    res.json(listings);  // Send the listings as JSON
  } catch (error) {
    console.error("Error fetching gallery:", error);
    res.status(500).json({ message: 'Error fetching gallery' });
  }
});


app.get("/listing/:id", async (req, res) => {
  const listingId = parseInt(req.params.id);

  try {
    const { listing, bids } = await getListing(listingId);
    const bidder_name = req.cookies?.bidder_name || '';
    res.render('listing.pug', { listing, bids, bidder_name });
  } catch (err) {
    res.status(404).render('404.pug');
  }
});

app.get('/create', (req, res) => {
  res.render('create'); 
});


app.post("/create", async (req, res) => {
  const { listingTitle, imgInput, textA, carsCat, date } = req.body;

  if (!listingTitle || !imgInput || !textA || !carsCat || !date) {
    return res.status(400).render('create_fail');
  }

  const newListingData = {
    title: listingTitle,
    url: imgInput,
    description: textA,
    category: carsCat,
    sale_date: date,
    end_time: date
  };

  try {
    const newListingId = await addListing(newListingData);
    res.render('create_success', { listingId: newListingId });
  } catch (error) {
    console.error('Error creating listing:', error);
    res.status(500).render('create_fail');
  }
});

app.post('/api/place_bid', async (req, res) => {
  const { bid_amount, comment, listing_id } = req.body;
  let { bidder_name } = req.body;
  const bidder_name_from_cookie = req.cookies?.bidder_name;

  if (bidder_name_from_cookie) {
    bidder_name = bidder_name_from_cookie;
  }

  if (!bidder_name || !bid_amount || !listing_id) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  const listing = await getListing(parseInt(listing_id));

  if (!listing) {
    return res.status(404).json({ message: 'Listing not found.' });
  }

  if (parseInt(bid_amount) < 1000) {
    return res.status(400).json({ message: 'Bid amount must be at least $1000.' });
  }

  try {
    const result = await placeBid({ listingId: listing_id, bidder: bidder_name, amount: bid_amount, comment });
    res.cookie('bidder_name', bidder_name, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 });

    res.json({
      message: 'Bid placed successfully!',
      newBid: result.bid,
      listing
    });
  } catch (error) {
    console.error('Error placing bid:', error);
    res.status(500).json({ message: 'Error placing bid' });
  }
});

app.delete('/api/delete_listing', async (req, res) => {
  const { listing_id } = req.body;

  if (!listing_id) {
    return res.status(400).json({ message: 'Missing listing_id' });
  }

  try {
    const result = await deleteListing(listing_id);
    if (result) {
      res.json({ message: 'Listing successfully deleted' });
    } else {
      res.status(404).json({ message: 'Listing not found' });
    }
  } catch (error) {
    console.error('Error deleting listing:', error);
    res.status(500).json({ message: 'Error deleting listing' });
  }
});

app.all('*', (req, res) => {
  res.status(404).render('404');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
