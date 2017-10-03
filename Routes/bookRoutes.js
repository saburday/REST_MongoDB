var express = require('express');

var routes = function(Book){
  var bookRouter = express.Router();

  bookRouter.route('/')
      .post(function(reg, res){
        var book = new Book(reg.body);

        book.save();
        res.status(201).send(book);
      })
      .get(function(reg,res){

        var query = {};
        if(reg.query.genre)
        {
          query.genre = reg.query.genre;
        }
          Book.find(query, function(err,books){
            if(err)
               res.status(500).send(err)
            else
               res.json(books);
          });
      });

  bookRouter.route('/:bookId')
      .get(function(reg,res){

          Book.findById(reg.params.bookId, function(err,book){
            if(err)
               res.status(500).send(err);
            else
               res.json(book);
          });
      })
      .put(function(reg,res){
        Book.findById(reg.params.bookId, function(err,book){
          if(err)
             res.status(500).send(err);
          else
             book.title = reg.body.title;
             book.author = reg.body.author;
             book.genre = reg.body.genre;
             book.read = reg.body.read;
             book.save();
             res.json(book);
        });
      });
      return bookRouter;
};
module.exports = routes;
