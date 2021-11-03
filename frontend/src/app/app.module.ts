// Imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlashMessagesModule } from 'angular2-flash-messages';



// Importing Routes for the application
import { routing } from './app.routing';

// Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/user/navbar/navbar.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { DashboardComponent } from './components/user/dashboard/dashboard.component';
import { HomeComponent } from './components/user/home/home.component';
import { ProductComponent } from './components/user/product/product.component';


// Services
import { UserAuthService } from './services/users/userauth.service';
import { ProductsService } from './services/products/products.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    DashboardComponent,
    HomeComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    FlashMessagesModule.forRoot(),
    routing
  ],
  providers: [
    UserAuthService,
    ProductsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
