import { Component } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  message: string = '';

  constructor(private dataService: DataService) {
    this.message = this.dataService.getMessage();
  }

  changeMessage(): void {
    this.dataService.setMessage('New Message');
    this.message = this.dataService.getMessage();
  }
}
