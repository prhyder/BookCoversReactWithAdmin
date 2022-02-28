import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GenreService {
  apiUrl: string = '';
  clientAppUrl: string = '';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.apiUrl = baseUrl;
    // TODO: Use environment vars in the future.
    //this.clientAppUrl = environment.appUrl;
  }

  getGenres() {
    return this.http.get(this.apiUrl + 'api/Genres');
  }

  public update(genre) {
    console.log("Service update: " + genre.genreId + ", " + genre.name);
    return this.http.put(this.apiUrl + 'api/Genres/' + genre.genreId, genre, this.httpOptions );
  }
}
