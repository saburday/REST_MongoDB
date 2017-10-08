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
  bookRouter.use('/:bookId', function(reg,res,next){
    Book.findById(reg.params.bookId, function(err,book){
      if(err)
         res.status(500).send(err);
      else if(book)
        {
          reg.book = book;
          next();
        }
        else
        {
           res.status(404).send('no book found');
        }
    });
  });
  bookRouter.route('/:bookId')
      .get(function(reg,res){
          res.json(reg.book);
      })
      .put(function(reg,res){
             reg.book.title = reg.body.title;
             reg.book.author = reg.body.author;
             reg.book.genre = reg.body.genre;
             reg.book.read = reg.body.read;
             reg.book.save(function(err){
               if(err)
                 res.status(500).send(err);
               else{
                 res.json(reg.book);
               }
           });
      })
      .patch(function(reg,res){
        if (reg.body._id)
           delete reg.body._id;
        for (var p in reg.body)
        {
          reg.book[p] = reg.body[p];
        }
      reg.book.save(function(err){
        if(err)
           res.status(500).send(err);
        else{
           res.json(reg.book);
        }
      });
    })
    .delete(function(reg,res){
      reg.book.remove(function(err){
        if(err)
           res.status(500).send(err);
        else{
           res.status(204).send('Removed');
        }
      });
    });
  return bookRouter;
};
module.exports = routes;
