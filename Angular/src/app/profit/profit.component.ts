import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../payment.service';

@Component({
  selector: 'app-profit',
  templateUrl: './profit.component.html',
  styleUrls: ['./profit.component.css']
})
export class ProfitComponent implements OnInit {

  public theatres = [];
  constructor(private paymentService: PaymentService) {
  }
  
  ngOnInit() {
  }

  getPayments(event) {
    this.paymentService.getPaymentsByDate(event.target.value).subscribe(res => {
      var data = []
      Object.keys(res).forEach(function(key) {
        if(res[key].name[0] in data) {
            var tempValue = data[res[key].name] + res[key].total
            data[res[key].name] = tempValue
        } else {
            data[res[key].name[0]] = res[key].total
        }
      })
      this.theatres = data
    })
  }
}
