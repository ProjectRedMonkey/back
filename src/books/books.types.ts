export type Book = {
  id: string;
  photo?: string;
  title: string;
  author: string;
  category: string;
  date: string;
  extract: string[];
  commentsId?: string[][];
};
