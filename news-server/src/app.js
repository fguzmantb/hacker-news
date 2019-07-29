const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const getNews = require('./utils/getNews');
const newsService = require('./data/newsService');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

//Connecting to MongoDB
const mongoUrl = process.env.IS_DOCKER ? 
      'mongodb://mongo:27017/news' : 'mongodb://localhost:27017/news';
mongoose
  .connect(
    mongoUrl, { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

//Getting new node news
setImmediate(getNews) ;
setInterval(getNews, 3600000);

// Endpoint to get news not deleted
app.get('/news/', async (req, res) => {
  console.log('Called get news');
  const limit = parseInt(req.query.limit);

  newsService.getNews(limit, (error, news) => {
    if(error) {
      res.status(500).send({
        error: error
      });
    } else {
      res.send(news);
    }
  });
});

// Endpoint to get all the news
app.get('/news/all', async (req, res) => {
  console.log('Called get all news');
  newsService.getAllNews((error, news) => {
    if(error) {
      res.status(500).send({
        error: error
      });
    } else {
      res.send(news);
    }
  });
});

// Endpoint to get news not deleted
app.delete('/news/:id', async (req, res) => {
  console.log('Called delete new');
  newsService.deleteNew(req.params.id, (error, result) => {
    if(error) {
      res.status(404).send({
        error: error
      });
    } else {
      res.send({
        results : 'New deleted successfully'
      });
    }
  });
});

app.listen(3005, () => {
    console.log('Listening at :3005')
});