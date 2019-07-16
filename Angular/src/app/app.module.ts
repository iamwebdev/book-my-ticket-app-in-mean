import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { MovieComponent } from './movie/movie.component';
import { LoginComponent } from './login/login.component';
import { BookTicketComponent } from './book-ticket/book-ticket.component';
import { ProfileComponent } from './profile/profile.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddMMovieComponent } from './add-mmovie/add-mmovie.component';
import { EditMovieComponent } from './edit-movie/edit-movie.component';
import { SetupShowComponent } from './setup-show/setup-show.component';
import { EditShowComponent } from './edit-show/edit-show.component';
import { MyTicketComponent } from './my-ticket/my-ticket.component';
import { ProfitComponent } from './profit/profit.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MovieComponent,
    LoginComponent,
    BookTicketComponent,
    ProfileComponent,
    AddMMovieComponent,
    EditMovieComponent,
    SetupShowComponent,
    EditShowComponent,
    MyTicketComponent,
    ProfitComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot() // ToastrModule added
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
