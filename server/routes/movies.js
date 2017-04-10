var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var MovieSchema = mongoose.Schema({
  title : String,
  director : String,
  runtime : String,
  year : Number,
  description : String

});

var Movie = mongoose.model('movie', MovieSchema, 'movies');

router.get('/',function(req,res) {
  Movie.find(function(err, favMovies) {
    if (err) {
      console.log('error reading from db: ', err);
      res.sendStatus(500);
    }
    res.send(favMovies);
  });
});//end router.get


router.post('/', function(req, res) {
  console.log('request received: ', req.body);
  var movie = new Movies();
  movie.title = req.body.title;
  movie.director = req.body.director;
  movie.runtime = req.body.runtime;
  movie.year = req.body.year;
  movie.description = req.body.description;
  movie.save(function(err, savedMovie) {
    if (err) {
      console.log('error saving to db: ', err);
      res.sendStatus(500);
    }
    res.send(savedMovie);
  });
});

//delete a movie
router.delete('/:id', function(req, res) {
  var removeID = req.params.id;
  console.log('request received: ', removeID);
  Movies.findByIdAndRemove(removeID, function(err, deletedFav){
    if(err){
      console.log('error removing: ', err);
      res.sendStatus(500);
    }
    console.log(deletedFav, ' removed from db');
    res.sendStatus(200);
  });
});


module.exports = router;
