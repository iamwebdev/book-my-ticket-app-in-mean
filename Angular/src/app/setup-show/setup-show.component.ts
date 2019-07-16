import { Component, OnInit } from '@angular/core';
import { MovieServiceService } from '../movie-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShowService } from '../show.service';

@Component({
  selector: 'app-setup-show',
  templateUrl: './setup-show.component.html',
  styleUrls: ['./setup-show.component.css']
})
export class SetupShowComponent implements OnInit {

  public movies:any = [];
  public theatres:any = [];
  public shows:any = [];
  showForm: FormGroup

  constructor(private movieService: MovieServiceService, private fb: FormBuilder, private showService: ShowService) {
    this.showForm = this.fb.group({
      movie_id: ['',[Validators.required]],
      timing: ['',[Validators.required]],
      theatre : ['', Validators.required],
      gold_ticket: ['',[Validators.required]],
      silver_ticket: ['', [Validators.required]],
      bronze_ticket: ['',[Validators.required]]
    })
   }

  ngOnInit() {
    this.movieService.getAllMovies().subscribe(res => {
      this.movies = res
    });
    this.showService.getTheatres().subscribe(res => {
      this.theatres = res['data']
    });
  }

  setupShow() {
    this.showService.saveShow(this.showForm.value).subscribe(res => {
      this.showForm.reset()
    })
  }

  getShowByTheatre(event){
    this.showService.getShowsByTheatre(event.target.value).subscribe(res => {
      this.shows = res
      console.log(this.shows)
    })
  }

  deleteShow(id){
    this.showService.deleteShowById(id)
      .subscribe(res => {
        this.shows = [];
        console.log('delete id', id);
      });
  }

  
}
