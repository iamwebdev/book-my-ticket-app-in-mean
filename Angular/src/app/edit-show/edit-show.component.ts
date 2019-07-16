import { Component, OnInit } from '@angular/core';
import { ShowService } from '../show.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MovieServiceService } from '../movie-service.service';

@Component({
  selector: 'app-edit-show',
  templateUrl: './edit-show.component.html',
  styleUrls: ['./edit-show.component.css']
})
export class EditShowComponent implements OnInit {
  editForm: FormGroup;
  public editShow:any = [];
  public movieShows:any = [];
  public showId;

  constructor(private service:ShowService,private activateRoute: ActivatedRoute,private formBuilder:FormBuilder, private movieService: MovieServiceService) {
    this.activateRoute.paramMap.subscribe((params: ParamMap) => {
      this.showId = params.get('id');
    });

    this.service.getShowById(this.showId).subscribe(res => {
      this.editShow = res['data']      
    })
  }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      movie_id: ['', Validators.required],
      timing: [this.editShow.timing, Validators.required],
      theatre: [this.editShow.theatre, Validators.required],
      gold_ticket: [this.editShow.gold, Validators.required],
      silver_ticket: [this.editShow.silver, Validators.required], 
      bronze_ticket: [this.editShow.bronze, Validators.required]
    });
    //get data of movies from movie service
    this.movieService.getAllMovies()
      .subscribe(res => {
        this.movieShows = res;
    });
  }

  updateShow() {
    this.service.updateShowById(this.showId, this.editForm.value)
    .subscribe(res => {
      console.log('res',res)
    })
  }
}
