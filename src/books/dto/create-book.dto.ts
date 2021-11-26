export class CreateBookDto {
  id?: string;
  photo?: string;
  title: string;
  author: string;
  category: string;
  date: number;
  extract: string;
}
