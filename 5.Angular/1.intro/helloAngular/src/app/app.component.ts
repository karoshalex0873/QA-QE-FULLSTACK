import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,FormsModule],
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
}
