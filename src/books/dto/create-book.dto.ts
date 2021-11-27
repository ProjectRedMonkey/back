export class CreateBookDto {
  photo?: string;
  title: string;
  author: string;
  category: string;
  date: number;
  extract: string[];
  commentsId?: string;
}
