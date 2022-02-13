import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fetch-book-covers',
  templateUrl: './fetch-book-covers.component.html'
})
export class FetchBookCoversComponent {
  public bookCovers: BookCover[];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<BookCover[]>(baseUrl + 'api/BookCovers').subscribe(result => {
      this.bookCovers = result;
    }, error => console.error(error));
  }
}

interface BookCover {
  bookCoverId: number;
  title: string;
  authorName: string;
  thumbnailUrl: string;
  imageUrl: string;
  portfolioOrder: number;
  showInPortfolio: boolean;
  genreId: number;
}
