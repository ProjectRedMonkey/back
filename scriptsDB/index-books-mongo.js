db.getCollection('books').createIndex(
  { title: 1, author: 1 },
  { unique: true }
);
