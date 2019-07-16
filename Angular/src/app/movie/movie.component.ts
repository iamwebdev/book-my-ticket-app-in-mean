import { Component, OnInit } from '@angular/core';
import { MovieServiceService } from '../movie-service.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  public currentMovies:any  = []
  public upcomingMovies:any  = []

  constructor(private movieService: MovieServiceService) { }

  ngOnInit() {
    this.movieService.getCurrentMovies().subscribe(res => {
      this.currentMovies = res['data'];
      console.log(this.currentMovies)
    })
    this.movieService.getUpcomingMovies().subscribe(res => {
      this.upcomingMovies = res['data'];
    })
  }

}
