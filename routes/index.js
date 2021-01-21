const express = require('express');
/* const app = express(); */
const router = express.Router();
// Se puede usar solo una linea: const router = require('express').Router();
const tweetBank = require('../tweetBank');
/* const socketio = require('socket.io');
// ...
var server = express.listen(3000); 
var io = socketio.listen(server); */

router.get('/', function (req, res) {
    let tweets = tweetBank.list();
    res.render('index', { tweets: tweets, showForm: true });
});

router.get('/users/:name', function (req, res) {
    var name = req.params.name;
    var list = tweetBank.find({ name: name });
    res.render('index', { tweets: list, showForm: true });
});

router.get('/tweets/:id', function (req, res) {
    var id = parseInt(req.params.id);
    var list = tweetBank.find({ "id": id });
    res.render('index', { tweets: list });
});

router.post('/tweets', function(req, res) {
    var name = req.body.name;
    var text = req.body.text;
    tweetBank.add(name, text);
    res.redirect('/');
});

router.post('/users/:name', function(req, res) {
    var name = req.body.name;
    var text = req.body.text;
    tweetBank.add(name, text);
    res.redirect('/users/' + name);
}); 




module.exports = router; 