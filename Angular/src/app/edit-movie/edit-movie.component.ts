import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MovieServiceService } from '../movie-service.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent implements OnInit {

  editMovieForm : FormGroup;
  public movie:any = [];
  public id:string;

  constructor(private fb: FormBuilder, private movieService: MovieServiceService, private route: ActivatedRoute) { 
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
    });
    console.log(this.id)
    this.movieService.getMovieById(this.id)
      .subscribe((res) => {
        this.movie = res
      })
      setTimeout(() => {
        this.editMovieForm = this.fb.group({
          name : [this.movie.name,[Validators.required]],
          date : [this.movie.date,[Validators.required]],
          actor: [this.movie.actor,[Validators.required]]
        });
        console.log(this.movie)
      }, 1000);
  }
  
  
  ngOnInit() {
    this.editMovieForm = this.fb.group({
      name : [this.movie.name,[Validators.required]],
      date : [this.movie.date,[Validators.required]],
      actor: [this.movie.actor,[Validators.required]]
    });
  }
  

  updateMovie(){
    this.movieService.updateMoviebyId(this.id,this.editMovieForm.value)
      .subscribe(res => {
        console.log('Response', res);
      })
  }
}
