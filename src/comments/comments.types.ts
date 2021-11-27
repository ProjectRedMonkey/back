export type Comments = {
  id: string;
  author: string;
  date?: number; // can use the actual date
  start: number;
  end: number;
  upVote?: number; // see if use
};
