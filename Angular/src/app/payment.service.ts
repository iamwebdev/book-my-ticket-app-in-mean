import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  readonly baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getPaymentsByDate(date) {
    return this.http.get(this.baseUrl+'/get-payments/'+date);
  }
}
