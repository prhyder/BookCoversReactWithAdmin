import { Component, OnInit, Inject } from '@angular/core';
import { BookCoverService } from '../../services/book-cover.service';

@Component({
  selector: 'book-covers',
  templateUrl: './book-covers.component.html',
  styleUrls: ['./book-covers.component.scss']
})
export class BookCoversComponent implements OnInit {
  public bookCovers: BookCover[] = [];

  constructor(private bookCoverService: BookCoverService) {}

  ngOnInit(): void {
    this.bookCoverService.getBookCovers().subscribe((data: any[]) => {
      this.bookCovers = data;
    });
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
