var bookController = function(Book){

  var post = function(reg, res){
    var book = new Book(reg.body);

    book.save();
    res.status(201).send(book);
  }

  var get = function(reg,res){

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
  }
  return {
    post: post,
    get: get
  }
}

module.exports = bookController;
