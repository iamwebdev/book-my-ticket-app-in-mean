import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MovieComponent } from './movie/movie.component';
import { LoginComponent } from './login/login.component';
import { BookTicketComponent } from './book-ticket/book-ticket.component';
import { ProfileComponent } from './profile/profile.component';
import { AddMMovieComponent } from './add-mmovie/add-mmovie.component';
import { EditMovieComponent } from './edit-movie/edit-movie.component';
import { SetupShowComponent } from './setup-show/setup-show.component';
import { EditShowComponent } from './edit-show/edit-show.component';
import { MyTicketComponent } from './my-ticket/my-ticket.component';
import { ProfitComponent } from './profit/profit.component';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path:'movies',component:MovieComponent},
  {path:'login',component:LoginComponent},
  {path: 'book-ticket', component:BookTicketComponent},
  {path: 'my-profile', component: ProfileComponent},
  {path: 'add-movie', component: AddMMovieComponent},
  {path: 'movie/:id/edit', component: EditMovieComponent},
  {path: 'setup-show', component: SetupShowComponent},
  {path: 'edit-show/:id',component:EditShowComponent},
  {path: 'view-ticket/:paymentId', component: MyTicketComponent},
  {path: 'view-profit', component: ProfitComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
