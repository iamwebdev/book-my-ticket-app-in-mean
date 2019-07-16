import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  readonly baseURL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }
  
  getAlreadyBookedSeats(formValues) {
    return this.http.post(this.baseURL+'/get-booked-seats', formValues)
  }

  bookMySeat(formValues) {
    return this.http.post(this.baseURL+'/book-my-ticket', formValues)
  }

  getMyTicket(paymentId) {
    return this.http.get(this.baseURL+'/get-ticket/'+paymentId)
  }
}
