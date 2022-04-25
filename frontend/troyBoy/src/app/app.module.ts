import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { FilterComponent } from './filter/filter.component';
import { HomeComponent } from './home/home.component';
import { ItemComponent } from './item/item.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    FilterComponent,
    HomeComponent,
    ItemComponent,
    NavbarComponent,
    SearchbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
