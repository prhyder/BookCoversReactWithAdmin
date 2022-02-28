import { Component, OnInit } from '@angular/core';
import { PremadeService } from '../../services/premade.service';

@Component({
  selector: 'premades',
  templateUrl: './premades.component.html',
  styleUrls: ['./premades.component.scss']
})
export class PremadesComponent implements OnInit {
  public premades: Premade[] = [];

  constructor(private premadeService: PremadeService) { }

  ngOnInit(): void {
    this.premadeService.getPremades().subscribe((data: any[]) => {
      console.log(data)
      this.premades = data;
    });
  }
}

interface BookCover {
  title: string;
  authorName: string;
  thumbnailUrl: string;
  imageUrl: string;
  portfolioOrder: number;
  showInPortfolio: boolean;
  genreId: number;
}

interface Premade {
  premadeId: number;
  bookCoverId: number;
  code: string;
  price: number;
  sold: boolean;
  displayInStore: boolean;
  premadeOrder: number;
  dateAdded: Date;
  purchaseDate: Date;
  seriesId: number;
  bookCover: BookCover[];
}
