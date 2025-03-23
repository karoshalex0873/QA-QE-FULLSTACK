import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  //details of a person
  person: {
    name: string;
    age: number;
    city: string;
  } = {
      name: 'Alex Smith',
      age: 30,
      city: 'New York'
    };
//printing them here
getInfo = () => {
  return `${this.person.name} lives in ${this.person.city} years old ${this.person.age}`;
  }


}
