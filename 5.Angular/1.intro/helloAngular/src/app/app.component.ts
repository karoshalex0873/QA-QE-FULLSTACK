import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [CommonModule,RouterOutlet,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
//string interpolation
title='Angular Data Binding'
//property binding
isDisabled = true;
imageUrl = 'https://angular.io/assets/images/logos/angular/angular.png';


  //details of a person
person ={name:'Alex karobia'}
message: string = ''; 

sayHello = () => {
  this.message = `Hello world! this is my first Angular app! my name is ${this.person.name.split(' ')[0]}`;
}
//twoway data binding
username: string = ''



// Lesson 2 diresctives
// condition for *ngIF
isloggedIn = false;

// looping over items using ngFor
cars = ['Toyota','Honda','BMW','Mercedes','Nissan'];
// object to loop over using ngFor
carObject:{name:string,model:string,year:number}= {
  name: 'Toyota',
  model: 'Corolla',
  year: 2022
};

// ngSwitch 
userRole = 'user'; // can be 'admin', 'user', or 'guest'

// 2 Attributes Directives
// ngClass  - Dynamically add or remove  CSS classes
isHighlighted = false;
// ngStyle - Dynamically set CSS styles
color='blue';
}
