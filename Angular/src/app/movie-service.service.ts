import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieServiceService {

  readonly baseURL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  // Save Movie in Db
  saveMovie(formValues) {
    return this.http.post(this.baseURL+'/add-movie',formValues)
  }

  // Get All Movies
  getAllMovies() {
    return this.http.get(this.baseURL+'/all-movies')
  }

  // Get Movie by Id
  getMovieById(id) {
    return this.http.get(this.baseURL+'/movie/'+id+'/edit')
  }

  updateMoviebyId(id,formValues){
    return this.http.put(this.baseURL+'/movie/'+id,formValues)
  }

  deleteMovieById(id){
    return this.http.delete(this.baseURL+'/movie/'+id);
  }

  getCurrentMovies() {
    return this.http.get(this.baseURL+'/get-current-movies/');
  }

  getUpcomingMovies() {
    return this.http.get(this.baseURL+'/get-upcoming-movies/');
  }
}
