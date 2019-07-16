import { Component, OnInit } from '@angular/core';
import { TicketService } from '../ticket.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-my-ticket',
  templateUrl: './my-ticket.component.html',
  styleUrls: ['./my-ticket.component.css']
})
export class MyTicketComponent implements OnInit {

  ticketDetails:any = []
  paymentId:string = '';

  constructor(private ticketService: TicketService, private router: ActivatedRoute) { 
    this.paymentId = router.snapshot.params.paymentId;
    this.ticketService.getMyTicket(this.paymentId).subscribe(res => {
      if (res['success']) {
        this.ticketDetails['theatre'] = res['data'][0].theatre_name
        this.ticketDetails['movie'] = res['data'][0].movie_id.name
        this.ticketDetails['price'] = res['data'][0].payment_id.paid_amount
        this.ticketDetails['date'] = this.formatDate(res['data'][0].show_date)
        this.ticketDetails['timing'] = res['data'][0].show_timing
        this.ticketDetails['path'] = res['data'][0].movie_id.path
        var ticketClass = ''
        var ticketNumber = ''
        res['data'].forEach(element => {
            ticketClass += element.ticket_class+','
            ticketNumber += element.ticket_number+','
        });
        this.ticketDetails['class'] = ticketClass.replace(/,\s*$/, "")
        this.ticketDetails['seat'] = ticketNumber.replace(/,\s*$/, "")
      }
    })    
  }

  ngOnInit() {
  }

  formatDate(date) {
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
    date = new Date(date)
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }

}
