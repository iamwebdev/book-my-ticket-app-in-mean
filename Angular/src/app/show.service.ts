import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShowService {

  readonly baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getAllShows() {
    return this.http.get(this.baseUrl+'/all-shows');
  }

  getTheatres() {
     return this.http.get(this.baseUrl+'/get-theatres')
  }
  
  saveShow(formValues) {
    return this.http.post(this.baseUrl+'/add-show', formValues)
  }

  getShowById(id) {
    return this.http.get(this.baseUrl+'/show/'+id)
  }

  updateShowById(id, formValues) {
    return this.http.put(this.baseUrl+'/show/'+id, formValues)
  }

  deleteShowById(id) {
    return this.http.delete(this.baseUrl+'/show/'+id)
  }

  getShowsByTheatre(theatreName) {
    return this.http.get(this.baseUrl+'/get-shows/'+theatreName)
  }

  getMovieListByTheatre(theatreName) {
    return this.http.get(this.baseUrl+'/get-movie-list/'+theatreName)
  }

  getAmount(ticketInfoArray) {
    return this.http.post(this.baseUrl+'/get-ticket-amount', ticketInfoArray)
  }
}
