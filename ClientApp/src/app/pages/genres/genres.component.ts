import { Component, OnInit } from '@angular/core';
import { GenreService } from '../../services/genre.service';

@Component({
  selector: 'genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss']
})
export class GenresComponent implements OnInit {
  public genres: Genre[] = [];

  constructor(private genreService: GenreService) { }

  ngOnInit(): void {
    this.genreService.getGenres().subscribe((data: any[]) => {
      this.genres = data;
    });
  }

}

interface Genre {
  genreId: number;
  name: string;
}
