const express = require('express');
const request = require('request');
const cron = require('node-cron');
const process = require('process');
const mongoose = require('mongoose');
 
mongoose.connect('mongodb://mongo:27017/emby', { useNewUrlParser: true });

const entrySchema = new mongoose.Schema({
    Movies: Number,
    Series: Number,
    Episode: Number
}, { timestamps: { createdAt: 'createdAt' } });

const Counts = mongoose.model('Counts', entrySchema);

const EMBY_KEY = process.env.EMBY_KEY;

const app = express();

cron.schedule('0 0 * * *', () => {
    request(`${EMBY_URL}/emby/Items/Counts?api_key=${EMBY_KEY}`, (err, resp, body) => {
        if (err)
            return console.error(err);
        const json = JSON.parse(body);
        Counts.create({Movies: json.MovieCount, Series: json.SeriesCount, Episode: json.EpisodeCount}, (err) => {
            if (err)
                return console.error(err);
        });
    });
})

app
.all('/', (req, res) => {
    res.render('index.ejs');
})
.get('/stats', (req, res) => {
    Counts.find((err, response) => {
        if (err)
            return res.json({status: false, err});
        const ret = [];
        response.forEach((elem) => {
            ret.push({
                movie: elem.Movies,
                serie: elem.Series,
                episode: elem.Episode,
                timestamp: elem.createdAt
            });
        })
        return res.json(ret);
    });
});

app.listen(3000);