import { Component, OnInit } from '@angular/core';
import { ShowService } from '../show.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TicketService } from '../ticket.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


declare var $ : any;

@Component({
  selector: 'app-book-ticket',
  templateUrl: './book-ticket.component.html',
  styleUrls: ['./book-ticket.component.css']
})
export class BookTicketComponent implements OnInit {
  
  public numbers = [];
  // All Theatres
  public theatres:any = [];
  public movies:any = [];
  public selectedSeats:any = {};
  public noOfSelectedSeats = 0;
  public totalAmount:any = 0;
  public bookedSeats:any = []
  public loggedInUserId;
  ticketForm:FormGroup

  constructor(private showService: ShowService, private fb: FormBuilder, private ticketService: TicketService, private toastr: ToastrService, private router: Router, private authService: AuthService) { 

    this.numbers = Array(54).fill(1).map((x,i)=>i);
    this.ticketForm = this.fb.group({
      theatre : ['',[Validators.required]],
      movie: ['',[Validators.required]],
      timing: ['',[Validators.required]],
      date: ['',[Validators.required]]
    });
    this.authService.getProfile().subscribe((res) => {
      if(!res['success']) {
        this.toastr.info('to book ticket','Please login',{timeOut: 2000});
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      } else {
        this.loggedInUserId = res['user']._id
      } 
    })
  }

  ngOnInit() {
    this.showService.getTheatres().subscribe(res => {
      this.theatres = res['data']
    });
    // Setting Up Calender For Only Seven Days
    var startDate = new Date();
    var formattedStartDate = this.formatDate(startDate);
    var endDate = startDate.setDate(startDate.getDate() + 7);
    var formattedEndDate = this.formatDate(endDate);
    $('#date').attr('min', formattedStartDate);
    $('#date').attr('max', formattedEndDate);
  }

  formatDate(date){
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }

  getBookedTickets(event, anotherEvent?: string) {
    if(anotherEvent) {
      this.getMoviesByTheatre(event)    
    }
    if (this.ticketForm.value.theatre && this.ticketForm.value.movie && this.ticketForm.value.timing && this.ticketForm.value.date) {
      this.ticketService.getAlreadyBookedSeats(this.ticketForm.value).subscribe(res => {
        // Removing Old Classes
          $('span').removeClass('booked-seat')
          Object.keys(res).forEach(function(key) {
            // Adding new CLases
            $('.'+res[key].ticket_number).addClass('booked-seat')
          })
      })
    }
  }

  getMoviesByTheatre(event) {
    this.showService.getMovieListByTheatre(event.target.value).subscribe(res => {
      this.movies = res['data']
    })  
  }

  getClickedSeat(theatreRow, seatNo, classOfSeat) {
    if (this.ticketForm.value.theatre == '' || this.ticketForm.value.movie == '' || this.ticketForm.value.timing == '' || this.ticketForm.value.date == '') {
      this.toastr.error('Select All Options','Please',{timeOut: 2000});      
    } else {
      var selectedSeatNumber = theatreRow + seatNo
      // Checking If SeatNo already present in array
      if (selectedSeatNumber in this.selectedSeats) {
          delete this.selectedSeats[selectedSeatNumber];
          $('.'+selectedSeatNumber).removeClass('selected-seat')        
      } else {
        this.selectedSeats[selectedSeatNumber] = classOfSeat
        $('.'+selectedSeatNumber).addClass('selected-seat')
      }
      this.noOfSelectedSeats = Object.keys(this.selectedSeats).length
      var ticketInfoArray = {
        theatreName : this.ticketForm.value.theatre,
        movieId : this.ticketForm.value.movie,
        showTiming : this.ticketForm.value.timing,
        showDate : this.ticketForm.value.date,
        ticketInfo : JSON.stringify(this.selectedSeats)
      } 
      this.showService.getAmount(ticketInfoArray).subscribe(res => {
        this.totalAmount = res
      })
    }

  }

  bookMyTicket(){
    this.ticketForm.value.seats = this.selectedSeats
    this.ticketForm.value.amount = this.totalAmount
    this.ticketForm.value.user_id = this.loggedInUserId
    if (this.ticketForm.value.amount > 0) {
      this.ticketService.bookMySeat(this.ticketForm.value).subscribe(res => {
        if (res['success']) {
          this.toastr.success('Successfully','Ticket(s) booked',{timeOut: 2000});
          setTimeout(() => {
            this.router.navigate(['view-ticket', res['payment_id']])
          }, 1000);
        }
      })
    } else {
      this.toastr.error('Seat','Please Select Your',{timeOut: 2000});
    }
  } 
}
