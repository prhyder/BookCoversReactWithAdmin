import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { GenreService } from '../../services/genre.service';

@Component({
  selector: 'genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss']
})
export class GenresComponent implements OnInit {
  public genres: Genre[] = [];

  constructor(private genreService: GenreService) { }

  settings = {
    add: {
      confirmCreate: true,
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      confirmSave: true,
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      genreId: {
        title: 'Genre Id',
        type: 'number',
      },
      name: {
        title: 'Name',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  onSaveConfirm(event): void {
    console.log("Save event");
    console.log(event);
    let genre = {
      genreId: event.data.genreId,
      name: event.newData.name
    };
    this.genreService.update(genre).subscribe((data) => {
      this.getGenres();
    });
  }

  onCreateConfirm(event): void {
    console.log("Create event");
    console.log(event);
  }

  getGenres() {
    this.genreService.getGenres()
      .subscribe((data: any[]) => {
        this.genres = data;
        this.source.load(data);
      }, error => console.log("HTTP Error: " + error))
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  ngOnInit(): void {
    this.getGenres();
    //this.genreService.getGenres()
    //  .subscribe((data: any[]) => {
    //    this.genres = data;
    //    this.source.load(data);
    //}, error => console.log("HTTP Error: " + error))
  }

}

interface Genre {
  genreId: number;
  name: string;
}
