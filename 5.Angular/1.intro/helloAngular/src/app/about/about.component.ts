import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [NavbarComponent,FormsModule,NgClass],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {


  //constractor for navigation
  constructor(private router:Router){}

  getHome(){
    this.router.navigate(['/'])
  }
  onsubmit(form:any){
    console.log(form)
  }
  // constructor
}
