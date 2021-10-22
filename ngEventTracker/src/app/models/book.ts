export class Book {

  id: number;
  title: string;
  author: string;
  series: string;
  description: string;
  studied: boolean;
  imageUrl: string;

  constructor(
    id: number = 0,
    title: string = '',
    author: string = '',
    series: string = '',
    description: string,
    studied: false,
    imageUrl: ''
  ) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.series = series;
    this.description = description;
    this.studied = studied;
    this.imageUrl = imageUrl;
  }
}
