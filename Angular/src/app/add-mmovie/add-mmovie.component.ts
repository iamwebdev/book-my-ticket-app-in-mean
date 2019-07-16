import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MovieServiceService } from '../movie-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-mmovie',
  templateUrl: './add-mmovie.component.html',
  styleUrls: ['./add-mmovie.component.css']
})
export class AddMMovieComponent implements OnInit {
  movieForm: FormGroup
  public movies:any = [];

  constructor(private fb: FormBuilder, private movieService: MovieServiceService, private toastr: ToastrService) { 
    this.movieForm = this.fb.group({
      name: ['',[Validators.required]],
      date: ['',[Validators.required]],
      actor: ['',[Validators.required]]
    })
  }

  ngOnInit() {
    this.movieService.getAllMovies().subscribe((res) => {
      // console.log(res)
      this.movies = res
    })
  }

  addMovie() {
    this.movieService.saveMovie(this.movieForm.value).subscribe((res) => {
      this.toastr.success('successfully', 'Movie added', {
        timeOut: 2000
      });
      this.movieForm.reset()
      this.ngOnInit()
    })
  }

  deleteMovie(id){
    // console.log(id)
    this.movieService.deleteMovieById(id)
      .subscribe(res => {
        console.log('delete id', res);
        this.ngOnInit()
      });
  }
}
