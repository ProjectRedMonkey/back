db.getCollection('comments').insertMany([
  {
    author: 'charles',
    date: ISODate('1897-01-22T09:00:00Z'),
    start: 9,
    end: 23,
    upVote: 10, // see if use
    text: 'je comprend pas cette partie du  Seigneur des Anneaux',
    idOfBook: 'Le Seigneur des Anneaux',
  },
  {
    author: 'Alexis',
    date: ISODate('1897-01-22T09:00:00Z'),
    start: 9,
    end: 23,
    upVote: 10, // see if use
    text: 'il demontre que que dieu est mort mais pas phisiquement',
    idOfBook: 'ainsi parlait zarathoustra',
  },
  {
    author: 'charles',
    date: ISODate('1897-01-22T09:00:00Z'),
    start: 22,
    end: 30,
    text: 'vraiment génial GOT',
    idOfBook: 'Le Trone de Fer',
  },
]);

//all the books initializie
var books = db
  .getCollection('books')
  .find({})
  .map(function (element) {
    return {
      _id: element._id,
      title: element.title,
    };
  });

var comment = db
  .getCollection('comments')
  .find({})
  .map(function (element) {
    return {
      _id: element._id,
      idOfBook: element.idOfBook,
    };
  });

//so we can connec the idOfOB with the id of the database book with the title
comment.forEach(function (element) {
  // ... check there is no already comment // maybe cancel if we and a list of comme,t
  // compare the idOfBook title and the title of the book
  var book = books.find(function (elt) {
    return elt.title.toLowerCase() === element.idOfBook.toLowerCase();
  });

  // check if we found one
  if (!!book) {
    // update the idOfBook of the comment with the id of the book
    db.getCollection('comments').updateOne(
      { _id: element._id },
      { $set: { idOfBook: book._id } }
    );
  } else {
    // if there is no book, we supp the comment
    db.getCollection('comment').remove({ idOfBook: element.idOfBook });
  }
});

db.getCollection('comments').find({});
