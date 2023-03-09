const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const path = require('path');
const serverless = require('serverless-http');

// Helmet is used to secure you app
// Require Helmet
// ---------------------
// const helmet = require('helmet');

// Import routes
const routes = require('./routes/index');

// Init express
const app = express();

// App middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
   extended: true
}));
app.use(bodyParser.json());
// Use Helmet
// -----------------------
// app.use(helmet());

// Routes
app.use('/api', routes);

// Search API
app.get(`/search`, (req, res) => {
   const term = req.query.term;// Get the term from the URL
   const media = req.query.media;// Get the media type from the URL

   // Run a fetch request to the iTunes API using the term and media type specified by the user
   fetch(`https://itunes.apple.com/search?term=${term}&media=${media}&limit=30`)
      .then(result => result.json())// Change the result into json format
      .then (response => {
         // Send the response if the request was successful
         res.send({
            message: 'Search was successful',
            response
         })
      })
      .catch(error => {
         // If there is an error then catch the error and send the error message
         res.send({
            message: 'There seems to be an error'
         })
      })
})

// This function is exactly the same as the one above except this one does not interact with the frontend to get the term and media, but has instead been hard coded. Using an exact copy of function above, but with hard coded term and media values helps to test the endpoints of the search.
app.get(`/searchTest`, (req, res) => {
   const term = 'Batman'; // Set the term
   const media = 'all'; // Set the media type

   // Run a fetch request to the iTunes API using the term and media type
   fetch(`https://itunes.apple.com/search?term=${term}&media=${media}&limit=30`)
      .then(result => result.json()) // Change the result into json format
      .then(response => {
         // Send the response if the request was successful
         res.send({
            message: 'Search was successful',
            response
         })
      })
      .catch(error => {
         // If there is an error then catch the error and send the error message
         res.send({
            message: 'There seems to be an error'
         })
      })
})

if (process.env.NODE_ENV === 'production') {
   // const reactBuild = path.join(__dirname, 'frontend', 'build')
   //Adding frontend build
   app.use(express.static(path.join(__dirname, 'frontend', 'build')));
   //Callback the build HTML file
app.get("*", async (req, res) => {
   res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
});
}

// Port listener
const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
   console.log(`Server is listening on port ${PORT}`);
});

// module.exports = app;
module.exports.handler = serverless(app);

//REFERENCES
// How You Can Serve React Build Folder From an Express Endpoint: https://plainenglish.io/blog/how-you-can-serve-react-js-build-folder-from-an-express-end-point-127e236e4d67